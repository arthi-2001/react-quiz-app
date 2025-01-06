import { useRef } from "react";


export default function Answers({answers,selectedAnswer, answerState}){
  const shuffledAnswers = useRef()
  if(!shuffledAnswers.current){
    shuffledAnswers.current  = [...answers]; // creating new array named shuffledAnswers to not disturb the original QUESTIONS array
    shuffledAnswers.current.sort(()=> Math.random()-0.5); // shuffle randomly. subtracting by 0.5 gives negative or positive numbers between 50 to 100 
   }
  
  return (
    <ul id="answers">
    {shuffledAnswers.current.map((answer)=>{
      const isSelected = answers === answer;
      let cssClass='';

      if(answerState==='answered' && isSelected){
          cssClass='selected'
      }

      if((answerState === 'correct' || answerState ==='wrong') && isSelected){
        cssClass = answerState;
      }

      return (
      <li key={answer} className="answer">
      <button onClick={()=>handleSelectAnswer(answer)} className={cssClass} >{answer}</button>
    </li>
    )
    })}
  </ul>
  )
};