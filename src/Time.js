import React from 'react';
import './Time.css'
export default function Time(props){
console.log(props)
const {Time, Timezone, Offset}= props.myData;
const Days=['Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday','Sunday'];
const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const myDate= new Date(Time);
console.log(myDate);
const day=Days[myDate.getDay()];
const Month=Months[myDate.getMonth()]
const Year = myDate.getFullYear()
const second =myDate.getUTCSeconds().toString();
const min=myDate.getUTCMinutes().toString();
const hour = myDate.getUTCHours().toString();
let currentTime=`${hour}:${min}:${second}`;
let currentDate=`${day} ${Month},${Year} `;
let utcTimezoneOffSet = `UTC:${Offset}`;

return(
    <div>
        <h1>{Timezone}</h1>
        <p>{currentTime}<span> {currentDate}</span><span> {utcTimezoneOffSet}</span></p> 
    </div>)


}