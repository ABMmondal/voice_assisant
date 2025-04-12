import React, { useContext } from 'react'
import './App.css'
import ai from './assets/ai.png'
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/ContextApi';

const App = () => {

  let {recognition} = useContext(dataContext)
     
  return (
    <div className='main'>
      <img src={ai} alt="" id='baby' />
      <span>Hi Baby I am your Virtual Assistant</span>
      <button onClick={()=>{
        recognition.start()
        
      }}>Click me <CiMicrophoneOn /> </button>
    </div>
  )
}

export default App