import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PersonalizeProvider } from './personalization/PersonalizeProvider';

const apiKey = import.meta.env.VITE_CS_API_KEY as string;
const deliveryToken = import.meta.env.VITE_CS_DELIVERY_TOKEN as string;
const environment = import.meta.env.VITE_CS_ENVIRONMENT as string;
const region =
  (import.meta.env.VITE_CS_REGION as 'NA' | 'EU' | 'AZURE-NA' | 'AZURE-EU') ||
  'NA';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PersonalizeProvider
      apiKey={apiKey}
      deliveryToken={deliveryToken}
      environment={environment}
      region={region}
    >
      <App />
    </PersonalizeProvider>
  </React.StrictMode>,
);
