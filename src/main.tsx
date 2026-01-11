import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss' // <-- ИМПОРТ ПЕРЕМЕННЫХ (ПЕРВЫМ!)
import './index.css'          // <-- БАЗОВЫЕ СТИЛИ VITE
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)