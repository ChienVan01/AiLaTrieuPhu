import React, { useEffect, useState } from 'react'
import useSound from "use-sound"
import play from "../sounds/play.mp3"
import correct from "../sounds/correct.mp3"
import wrong from "../sounds/wrong.mp3"
import wait from "../sounds/wait.mp3"

export default function Quiz({data, setStop, questionNumber, setQuestionNumber}) {

    const [question,setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    const [Wait] = useSound(wait);

    useEffect(()=>{
        letPlay();
    }, [letPlay])

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    }

    const handleClick = (m) =>{
        Wait();
        setSelectedAnswer(m);
        setClassName("answer active");
        console.log(setClassName);
        delay(3000, () =>{
            setClassName(m.correct ? "answer correct" : "answer wrong");
        })
        delay(5000, () =>{
            if(m.correct){
                correctAnswer();
                delay(1000, ()=>{
                    setQuestionNumber(prev => prev + 1);
                    setSelectedAnswer(null);
                })
              
            }
            else{
                wrongAnswer();
                delay(1000, ()=>{
                    setStop(true);

                })
            }
        })
    }

    return (
        <div className="quiz">
            <div className="question">{question?.question}</div>            
            <div className="answers">
                {question?.answers.map((m)=> (
                    <div 
                     className={selectedAnswer === m ?  className : "answer"}
                     onClick={() => handleClick(m)}
                    >{m.text}</div>  
                ))}
                
            </div>            
        </div>
    )
}
