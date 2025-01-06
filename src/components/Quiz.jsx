import { useCallback, useState } from "react";
// import QUESTIONS from '../questions.js';
import QUESTIONS from '../questions.js';
import Answers from './Answers.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){
  const [answerState,setAnswerState] =useState("unanswered");
   const [userAnswers,setUserAnswers] = useState([]);
   const activeQuestionIndex = (answerState === "") ? userAnswers.length : userAnswers.length -1;  // if answered 2 questions. then current question is 3.
   
   const quizIsComplete = activeQuestionIndex === QUESTIONS.length;  // check if reached the last question
   
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    setAnswerState('answered');
       setUserAnswers((prevUserAnswer)=>{
        return [...prevUserAnswer,selectedAnswer]
       });
       setTimeout(()=>{
         if(selectedAnswer=== QUESTIONS[activeQuestionIndex].answers[0])
         {
          setAnswerState('correct')
         }
         else{
          setAnswerState('wrong')
         }
setTimeout(()=>{
   setAnswerState('')
},2000)

       },1000)
   },[activeQuestionIndex]); 

const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null),[handleSelectAnswer])


   if(quizIsComplete){
    return <div id="summary">
         <img src={quizCompleteImg} alt="Trophy icon"/>
         <h2>Quiz Completed!</h2>
    </div>
   }
   
   
  return (
    <div id="quiz">
  <div id="question">
    <QuestionTimer 
    key = {activeQuestionIndex}  // reset the timer to load for each question
    timeout={10000} 
    onTimeOut={handleSkipAnswer} />

    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
   <Answers answers={QUESTIONS[activeQuestionIndex].answers}
            selectedAnswer = {userAnswers[userAnswers.length-1]}
            answersState={answerState}/>
  
  </div>
  </div>
  )
}