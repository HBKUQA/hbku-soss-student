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
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

axios.defaults.baseURL = BASE_URL

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
