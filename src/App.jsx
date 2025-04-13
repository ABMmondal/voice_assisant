import React, { useContext } from 'react'
import './App.css'
import ai from './assets/ai.png'
import speakimg from './assets/speak.gif'
import aivoice from './assets/aiVoice.gif'
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/ContextApi';

const App = () => {

  let { recognition, speaking, setspeaking, promptText, responseText } = useContext(dataContext)

  return (
    <div className='main'>
      <img src={ai} alt="" id='baby' />
      <span>Hi Baby I am your Virtual Assistant</span>

      {!speaking ? <button onClick={() => {
        recognition.start()
        setspeaking(true)
      }}>Click me <CiMicrophoneOn />
      </button> :
        <div className='response'>
          {!responseText ? <img src={speakimg} alt="" id='speakimg' /> :
            <img src={aivoice} alt="" id='speakimg' />}

          <p>{promptText}</p>

        </div>

      }

    </div>
  )
}

export default App