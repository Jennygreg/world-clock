import React,{useState, useEffect} from 'react';
import './clockFace.css';

export default function ClockFace(){
    const [hourHand, setHourHand]=useState('hr');
    const[minHand, setMinHand]=useState('mn');
    const [secHand, setSecHand]=useState('ss');
   
    useEffect(() => {
        const intervalId = setInterval(() => {
          const time = new Date();
          setHourHand(time.getHours());
          setMinHand(time.getMinutes() );
          setSecHand(time.getSeconds() );
        }, 1000);
        return () => clearInterval(intervalId);
      }, []); 
 const hourRotation = (hourHand % 12) * 30 + minHand * 0.5 + secHand * 0.00833333;
  const minuteRotation = minHand * 6 + secHand * 0.1;
  const secondRotation = secHand * 6;
    return(
    <div id='container'>
        <div className="clock"> 
        <div className='needle hr' style={{'--h':'40px', '--clr':'black',transform: `rotate(${hourRotation}deg)`   }}><span></span></div>
         <div className='needle mn' style={{'--h':'45px', '--clr':'black',transform: `rotate(${minuteRotation}deg)` }}><span></span></div>
         <div className='needle ss' style={{'--h':'45px', '--clr':'red',transform: `rotate(${secondRotation}deg)`}}><span></span></div>
        {Array(12).fill()
        .map((_, index)=>(
       <div key={index} className='hour'style={{'--index':index + 1}}>
         < span>  {index +1 }</span>
         </div>
        
    ))} 
       </div>
       </div>
)
    
}
