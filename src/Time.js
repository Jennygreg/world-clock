import React from 'react';
import './Time.css'
export default function Time(props){
   const myData=props.myData
   if(!myData){
    return<div>Loading please wait...</div>
   }
console.log(props)
const Time= myData.datetime;
const Timezone=myData.timezone;
const offset=myData.utc_offset;
const abbr=myData.abbreviation;

const Days=['Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday','Sunday'];
const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const myDate= new Date(Time);
console.log(myDate);
const day=Days[myDate.getDay()];
const Month=Months[myDate.getMonth()]
const Year = myDate.getFullYear()
let second =myDate.getUTCSeconds().toString();
if(second< 10){
    second=`0${second}`;
}
let min=myDate.getUTCMinutes().toString();
if (min<10){
    min=`0${min}`
}
let hour = myDate.getUTCHours().toString();
if(hour<0){
    hour=`0${hour}`
}
let currentTime=`${hour}:${min}:${second}`;
let currentDate=`${day} ${Month},${Year} `;
let utcTimezoneOffSet = `UTC:${offset}`;

return(
    <div>
        <h1>{Timezone}</h1>
        <h2> {currentDate}</h2>
        <p>{currentTime}
        <span> {utcTimezoneOffSet}</span>
        <span> {abbr}</span>
        </p> 
    </div>)


}