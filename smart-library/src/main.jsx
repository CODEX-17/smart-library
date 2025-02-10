import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NotificationProvider } from './context/NotificationContext.jsx'

const rootSelector = document.getElementById('root');
const root = ReactDOM.createRoot(rootSelector);

root.render(
    <React.StrictMode>
      <NotificationProvider>
        <App />
      </NotificationProvider>
  </React.StrictMode>,
)
