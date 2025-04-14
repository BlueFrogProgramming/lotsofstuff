import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const addError = useCallback((message) => {
    const id = Date.now();
    setErrors(prevErrors => {
      const filteredErrors = prevErrors.filter(error => error.message !== message);
      return [...filteredErrors, { id, message: message || 'An unknown error occurred.' }];
    });
    setTimeout(() => {
      clearError(id);
    }, 5000);
  }, [setErrors]);

  const clearError = (id) => {
    setErrors(prevErrors => prevErrors.filter(err => err.id !== id));
  };

  const safeAsync = useCallback(
    async (fn) => {
      setLoading(true);
      try {
        await fn();
      } catch (e) {
        console.log('Caught async error:', e);
        addError(e.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    },
    [addError]
  );

  return (
    <ErrorContext.Provider value={{ safeAsync, errors, addError, clearError, loading }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useAsyncErrorHandler = () => useContext(ErrorContext);
