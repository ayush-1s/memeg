import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'
import Header from './components/Header'
import Meme from './components/Meme'

function App() {
 

  return (
   <div>
    <Header/>
    <Meme />
   </div>
  )
}

export default App
