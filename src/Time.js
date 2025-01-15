import React,{useState, useEffect} from 'react';
import './Time.css'
export default function Time(props){
const timeDate=props.myData.response; 
const [currentTime, setCurrentTime]=useState(new Date());
useEffect(()=>{
    const intervalId=setInterval(()=>{ 
    setCurrentTime(new Date());}, 1000); 
    return()=>{
        clearInterval(intervalId)
    };
},[]);
if(timeDate){
    const {timezone,utc_offset, abbreviation}= timeDate
    const Days=['Sun','Mon','Tues','Wed','Thur', 'Fri','Sat'];
    const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const utcOffset = parseInt(timeDate.utc_offset);
    /*This gets the currentTime in milliseconds since the Unix epoch (January 1, 1970, 00:00:00 UTC).
     calculates the UTC offset which is UTC  hours in seconds by multiplying it by 60  * 60 and convert it from second
     to millisecond by multiplying it by 1000 */
    const cityTime = new Date(currentTime.getTime() + (utcOffset * 60 * 60 * 1000));
  
    const day=Days[cityTime.getDay()];
    const Month=Months[cityTime.getMonth()]
    const Year = cityTime.getFullYear()
    let second =cityTime.getUTCSeconds().toString();
    if(second< 10){
        second=`0${second}`;
    }
    let min=cityTime.getUTCMinutes().toString();
    if (min<10){
        min=`0${min}`
    }
    let hour = cityTime.getUTCHours().toString();
    if(hour<0){
        hour=`0${hour}`
    }
    let formattedTime=`${hour}:${min}:${second}`;
    let currentDate=`${day} ${Month},${Year} `;
    let utcTimezoneOffSet = `UTC:${utc_offset}`;
       
    return(
        <div id='searchresult'> 
            <h2>{timezone}</h2>
            <p> {currentDate}</p>
            <p>{formattedTime}
            <span> {utcTimezoneOffSet}</span>
            <span> {abbreviation}</span>
            </p> 
        </div>)}else{
    
    return (<div id="timeDataError"><p>Please check your network connection and enter valid search e.g continent/city</p></div> )
 }


}