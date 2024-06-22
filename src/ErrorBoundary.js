import { Component } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: null,
  };

  static propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch( errorInfo) {
    console.error('Error caught by ErrorBoundary:',  errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
