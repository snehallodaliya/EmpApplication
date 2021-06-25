import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthProvider } from "./lib/auth";
import { QueryClient, QueryClientProvider } from "react-query";

import reportWebVitals from './reportWebVitals';
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


