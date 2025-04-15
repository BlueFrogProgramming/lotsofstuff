import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorProvider } from './components/ErrorContext.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import GlobalErrorDisplay from './components/GlobalErrorDisplay.jsx'
import ErrorFallback from './components/ErrorFallback.jsx'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

import i18n from './utils/i18next.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <ErrorProvider>
        <GlobalErrorDisplay />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </ErrorProvider>
    </MantineProvider>
  </StrictMode>
)
