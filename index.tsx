import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // আপনার CSS ফাইলের নাম অনুযায়ী

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)