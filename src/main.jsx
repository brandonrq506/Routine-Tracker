import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ItemsProvider from './store/ItemsProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ItemsProvider>
            <App />
        </ItemsProvider>
    </React.StrictMode>,
);