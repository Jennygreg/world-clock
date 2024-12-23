import React,{useState, useEffect} from 'react'
export default function FavCity(){
    const favCities=["Africa/Lagos", "Europe/London","Asia/Tokyo","America/New_York"];
    const [cityData, setCityData]= useState([{}]);
    const [error, setError]= useState();

    useEffect(()=>{
     const fetchCityData= async()=>{
      
        try{
          const responses= await Promise.all(favCities.map((city)=> 
            fetch(`http://worldtimeapi.org/api/timezone/${city}`)));
          const searchReponse= await Promise.all(responses.map((response)=>response.json()));
setCityData(searchReponse)
        }catch(error){
          console.log(error.message)
          setError(error.message)
        }
      }
    fetchCityData()},[])
    useEffect(()=>{
      console.log(cityData)
    },[cityData])
if (error)
  {return<div>{error}</div>}
 else{return(cityData.map((favcity, index)=>{
  const Days=['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
  const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const timeDate=new Date (favcity.utc_datetime)
  
    console.log(timeDate);
    const day=Days[timeDate.getDay()];
    const Month=Months[timeDate.getMonth()]
    const Year = timeDate.getFullYear()
    let second =timeDate.getUTCSeconds().toString();
    if(second< 10){
        second=`0${second}`;
    }
    let min=timeDate.getUTCMinutes().toString();
    if (min<10){
        min=`0${min}`
    }
    let hour = timeDate.getUTCHours().toString();
    if(hour<0){
        hour=`0${hour}`
    }
    let currentTime=`${hour}:${min}:${second}`;
    let currentDate=`${day} ${Month},${Year} `;
    let utcTimezoneOffSet = `UTC:${favcity.utc_offset}`;

  return (<div key={index}> 
  <h1> {favcity.timezone}</h1>
  <h2>{currentDate}</h2>
  <h3>{currentTime}</h3>
  <h4>{utcTimezoneOffSet}</h4>
  </div>
  )
  }))}}
   
