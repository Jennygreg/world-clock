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
    const {cityName,gmtOffset,abbreviation,}= timeDate
    const Days=['Sun','Mon','Tues','Wed','Thur', 'Fri','Sat'];
    const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const offset = gmtOffset / 3600;
// Calculate the current time in the city's timezone by adding the UTC offset to the current time
// currentTime.getTime() gets the current time in milliseconds since the Unix epoch
// offset * 60 * 60 * 1000 calculates the UTC offset in milliseconds
// (hours to seconds to milliseconds)
     const cityTime = new Date(currentTime.getTime() + (offset * 60 * 60 * 1000));
  
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
const formattedTime=`${hour}:${min}:${second}`;
const currentDate=`${day} ${Month}, ${Year} `;
const utcTimezoneOffSet = `UTC:${offset >= 0 ? '+' : '-'}${Math.abs(offset).toString().padStart(2, '0')}`;
       
    return(
        <div id='searchResult'> 
            <h2>{cityName}</h2>
            <p> {currentDate}</p>
            <p>{formattedTime}
            <span> {utcTimezoneOffSet}</span>
            <span> {abbreviation}</span>
            </p> 
        </div>)
 }
 else{
    
    return (<div id="searchError"><h4>An unknown error occurred try again:  </h4>
    <p>Check network connection and enter valid search</p>
    </div> )}

}