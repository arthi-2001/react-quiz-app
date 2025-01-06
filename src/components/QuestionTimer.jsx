import { useEffect, useState } from "react";

export default function QuestionTimer({timeout,onTimeOut}){  // timeout ms and onTimeOut are received
const [remainingTime,setRemainingTime] = useState(timeout);

useEffect(()=>{
  console.log("Time out")
  const timer = setTimeout(onTimeOut,timeout);  // onTimeOut function is called every timeout milliseconds

 return ()=>{
  clearTimeout(timer);
 };
},[timeout,onTimeOut]);

useEffect(()=>{
  console.log("Interval")
  const interval = setInterval(()=>{
    setRemainingTime((prevRemainingTime)=>prevRemainingTime-100)
  },100);

  return ()=>{
    clearInterval(interval);
  };
},[]);
  
  return <progress  id="question-time" max={timeout} value={remainingTime}/>
}