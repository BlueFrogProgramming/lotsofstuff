import React from 'react';
import { useAsyncErrorHandler } from './components/ErrorContext';

const UnexpectedError = () => {
  
  const { safeAsync, loading } = useAsyncErrorHandler();
  const handleAsyncError = () =>
    safeAsync(async () => {
      const res = await fetch('https://non-existing-api.com/data');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      console.log(data);
    });

  return (
      <div>
        <button onClick={handleAsyncError}>Simulate Async Error</button>
        {loading && <p>Loading...</p>}
      </div>
  );
};

export default UnexpectedError;
