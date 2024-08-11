import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import ContextProvider from './context/ContextProvider';
import App from './components/App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ContextProvider>
        <App />
      </ContextProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
