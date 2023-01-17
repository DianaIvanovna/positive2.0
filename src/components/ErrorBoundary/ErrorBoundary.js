import React from "react";
import "./ErrorBoundary.scss";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console
        console.log(" 111111111111", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.noShowError) {
                return null;
            }

            // You can render any custom fallback UI
            return <h1 className="error-boundary__error">Что-то пошло не так. Перезагрузите страницу и попробуйте снова.</h1>;
        }

        return this.props.children;
    }
}
