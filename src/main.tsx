import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import { store } from "./store";
import { StoreProvider } from "easy-peasy"

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <AnswersHeadlessProvider
        experienceKey="us_presidents"
        apiKey="54748246e648d315c59bec5b05c61ebb"
        experienceVersion="PRODUCTION"
        locale="en"
      >
        <App />
      </AnswersHeadlessProvider>
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
)
