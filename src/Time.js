import React from 'react';
import './Time.css'
export default function Time(props){
const timeDate=props.myData.response; 

if(timeDate){console.log(props)
    const {timezone,utc_offset, abbreviation}= timeDate
    const Days=['Sun','Mon','Tues','Wed','Thur', 'Fri','Sat'];
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
        <div className='searchresult'> 
            <h2>{timezone}</h2>
            <p> {currentDate}</p>
            <p>{currentTime}
            <span> {utcTimezoneOffSet}</span>
            <span> {abbreviation}</span>
            </p> 
        </div>)}else{
    
    return (<p>Please check your network connection and enter valid search e.g continent/city</p> )
 }


}