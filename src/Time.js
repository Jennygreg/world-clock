import React from 'react';

import './Time.css'
export default function Time(props){
const timeDate=props.myData.response; 

if(timeDate){console.log(props)
    const {timezone,utc_offset, abbreviation}= timeDate
    const Days=['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
    const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const utcOffset = parseInt(timeDate.utc_offset);
  const cityCurrentTime = new Date();
  const cityTime = new Date(cityCurrentTime.getTime() + (utcOffset * 60 * 60 * 1000));
    
    console.log(cityTime);
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
    let currentTime=`${hour}:${min}:${second}`;
    let currentDate=`${day} ${Month},${Year} `;
    let utcTimezoneOffSet = `UTC:${utc_offset}`;
       
    return(
        <div>
            <h1>{timezone}</h1>
            <h2> {currentDate}</h2>
            <p>{currentTime}
            <span> {utcTimezoneOffSet}</span>
            <span> {abbreviation}</span>
            </p> 
        </div>)}else{
    
    return 'Please check your network connection and enter valid search e.g Africa/Lagos, Europe/London '
 }


}