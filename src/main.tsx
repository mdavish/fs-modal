import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";

ReactDOM.render(
  <React.StrictMode>
    <AnswersHeadlessProvider
      experienceKey="us_presidents"
      apiKey="54748246e648d315c59bec5b05c61ebb"
      experienceVersion="PRODUCTION"
      locale="en"
    >

      <App />
    </AnswersHeadlessProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
