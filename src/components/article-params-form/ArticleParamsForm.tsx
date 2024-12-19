import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose'; // Импортируем хук

type ArticleParamsFormProps = {
	onChange: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onChange,
}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Состояние открытости сайдбара
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Ссылка на контейнер сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Используем хук для закрытия сайдбара при клике вне
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen, // Управление состоянием открытости
		onClose: () => setIsSidebarOpen(false), // Дополнительная логика при закрытии (в данном случае просто закрываем сайдбар)
	});

	useEffect(() => {
		if (sidebarRef.current) {
			// Меняем класс контейнера при открытии/закрытии сайдбара
			sidebarRef.current.classList.toggle(styles.container_open, isSidebarOpen);
		}
	}, [isSidebarOpen]);

	// Сброс параметров к значениям по умолчанию
	const handleReset = () => {
		const resetState = { ...defaultArticleState };
		setSelectedFontFamily(resetState.fontFamilyOption);
		setSelectedFontSize(resetState.fontSizeOption);
		setSelectedFontColor(resetState.fontColor);
		setSelectedBackgroundColor(resetState.backgroundColor);
		setSelectedContentWidth(resetState.contentWidth);
		onChange(resetState);
	};

	// Отправка формы
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	// Рендер компонента
	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Text family='open-sans' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Опции шрифта */}
					<div className={styles.optionsContainer}>
						<Select
							selected={selectedFontFamily}
							onChange={setSelectedFontFamily}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
						<RadioGroup
							selected={selectedFontSize}
							name='fontSize'
							onChange={setSelectedFontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedFontColor}
							onChange={setSelectedFontColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					<Separator />

					{/* Опции фона и ширины контента */}
					<div className={styles.optionsContainer}>
						<Select
							selected={selectedBackgroundColor}
							onChange={setSelectedBackgroundColor}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={selectedContentWidth}
							onChange={setSelectedContentWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					{/* Нижняя часть формы */}
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
