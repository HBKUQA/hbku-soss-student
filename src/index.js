import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/scss/main.scss'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import axios from 'axios'
import { BASE_URL } from './params'
axios.defaults.baseURL = BASE_URL

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
