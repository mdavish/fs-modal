import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { store } from "./store";
import { StoreProvider } from "easy-peasy"

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <SearchHeadlessProvider
        experienceKey="yext-help-site-demo"
        apiKey="1c81e4de0ec0e8051bdf66c31fc26a45"
        locale="en"
      >
        <App />
      </SearchHeadlessProvider>
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
)
