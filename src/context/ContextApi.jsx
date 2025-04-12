import React, { createContext } from 'react'
import run from '../gemini.js'


export const dataContext = createContext()


const ContextApi = ({children}) => {
    function Speak(text) {


        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 0.9;
        text_speak.pitch = 1;
        text_speak.lang = 'hi-IN' 
        window.speechSynthesis.speak(text_speak) // Fixed method name and casing
    }
    
    async  function aiResponse(prompt){
        let text = await run(prompt)
        console.log(text)
        Speak(text)
    }

    let speachRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speachRecognition()
    recognition.onresult=(e)=>{
        let transcript = e.results[0][0].transcript
        console.log(transcript)
        aiResponse(transcript)
    }
    
    let value = {
        recognition }
    
    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default ContextApi