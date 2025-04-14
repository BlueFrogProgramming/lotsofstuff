import React from 'react';
import { useAsyncErrorHandler } from './ErrorContext';
import './GlobalErrorDisplay.css';
import { X, RotateCw } from 'lucide-react';

const GlobalErrorDisplay = () => {
  const { errors, clearError } = useAsyncErrorHandler();
  console.log(errors)
  if (!errors.length) return null;

  return (
    <div className="container">
      {errors.map(({ id, message }) => (
        <div key={id} className="box">
          <p className="message">Error: {message}</p>
          <button className="dismiss" onClick={() => clearError(id)}><X color='#a00' size={27}/></button>
          <button className="refresh" onClick={() => window.location.reload()}><RotateCw color='#a00' size={22}/></button>
        </div>
      ))}
    </div>
  );
};

export default GlobalErrorDisplay;
