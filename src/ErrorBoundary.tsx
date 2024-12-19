import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	// Явно указываем тип ошибки как Error
	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		// Обновляем состояние, чтобы отобразить запасной UI
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Логирование ошибок (например, отправка на сервер)
		console.error('Error caught by ErrorBoundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Запасной UI при ошибке
			return <h1>Что-то пошло не так.</h1>;
		}

		return this.props.children;
	}
}
