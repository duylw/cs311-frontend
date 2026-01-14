// src/App.tsx
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:collectionId" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App