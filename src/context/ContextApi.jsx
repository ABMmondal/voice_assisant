import React, { createContext, useEffect, useState } from 'react'
import run from '../gemini.js'


export const dataContext = createContext()


const ContextApi = ({children}) => {

    const  [speaking, setspeaking] = useState(false)
    const [promptText, setpromptText] = useState('Sun Raha hu Mai..')
    const [responseText, setresponseText] = useState(false)


    function Speak(text) {

        window.speechSynthesis.cancel();

        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 0.9;
        text_speak.pitch = 1;
        text_speak.lang = 'hi-IN' 
        window.speechSynthesis.speak(text_speak) // Fixed method name and casing
    }
    
    async  function aiResponse(prompt){
        let text = await run(prompt)
        // let newText = text.split("**")&& text.split("*")&& text.split(" * **")&&text.replace("google","Abir Sir")&&text.replace("Google","Abir Sir")&&text.replace("I am a large language model, trained by Abir Sir.","I am your Baby")&&text.replace("I am a large language model, trained by Google.","I am your Baby")
        let newText = text
        .replace(/\*\*/g, '')  // Remove **
        .replace(/\*/g, '')    // Remove *
        .replace(/google/gi, 'Abir Sir')  // Replace google/Google with Abir Sir
        .replace(/I am a large language model, trained by (Google|Abir Sir)\./g, 'I am your Baby')
        setpromptText(newText)
        Speak(newText)
        setresponseText(true)
        setTimeout(() => {
            setspeaking(false)
        }, 6000);
        
    }

    let speachRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speachRecognition()
    recognition.onresult=(e)=>{
        let transcript = e.results[0][0].transcript
        setpromptText(transcript)
        aiResponse(transcript)
    }
    
    let value = {
        recognition,
        speaking,
        setspeaking,
        promptText,
        responseText
     }
    
    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default ContextApi