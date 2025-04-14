import { useEffect } from 'react';
import { useAsyncErrorHandler } from './ErrorContext';

const ErrorFallback = ({ error }) => {
  const { addError } = useAsyncErrorHandler();

  useEffect(() => {
    if (error) {
      addError(error.message || 'An unexpected error occurred.');
    }
  }, [error, addError]);

  return null;
};

export default ErrorFallback;