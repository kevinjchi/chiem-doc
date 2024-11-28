import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Diagram from './diagram.tsx'
import App from './App.tsx'
import PlaywrightFlow from '../PlaywrightFlow.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <PlaywrightFlow />
   
  </StrictMode>
)
