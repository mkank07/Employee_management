import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const domain ="dev-74gpsybdqyhicn6c.us.auth0.com"
const clientId ="QCUoo5XKR5LiYbbrXKl7DWKqVmwf9apz"

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{redirect_uri:window.location.origin}}
    >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Auth0Provider>
  
)
