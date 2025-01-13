import React,{useState, useEffect} from 'react'
import LoaderIcon from "react-loader-icon";
import  './FavCity.css'
export default function FavCity(){
    const favCities=["Africa/Lagos", "Europe/London","Asia/Tokyo","America/New_York",];
    const [cityData, setCityData]= useState([{}]);
    const [error, setError]= useState();
    const[loading, setLoading]=useState(true)

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
        }finally {
          setLoading(false);
        }
      }
    fetchCityData()
    
  }, [])  // Empty dependency array is intentional, as we only fetch data once on mount
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Array.isArray(cityData)) { // Check if cityData is an array
        setCityData((prevCityData) =>
          prevCityData.map((city) => {
            const utcOffset = parseInt(city.utc_offset);
            const cityCurrentTime = new Date();
            const cityTime = new Date(cityCurrentTime.getTime() + (utcOffset * 60 * 60 * 1000));
            return { ...city, datetime: cityTime };
          })
        );
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [cityData]); 
if (error)
  {return (<div className='error'>Network problem please reload page ...</div>)}
if(loading){
return(
<div className='loadingIcon'>
  <LoaderIcon type={"spin"}/>
<p>Loading</p>
</div>)
}
 else{return(cityData.map((favcity, index)=>{
  const Days=['Sun','Mon','Tues','Wed','Thurs', 'Fri','Sat'];
  const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const utcOffset = parseInt(favcity.utc_offset);
  const cityCurrentTime = new Date();
  const cityTime = new Date(cityCurrentTime.getTime() + (utcOffset * 60 * 60 * 1000));
  
    console.log(cityTime);
    const day=Days[cityTime.getDay()];
    const Month=Months[cityTime.getMonth()]
    const Year = cityTime.getFullYear()
    let second =cityTime.getUTCSeconds();
    if(second< 10){
        second=`0${second}`;
    }
    let min=cityTime.getUTCMinutes();
    if (min<10){
        min=`0${min}`
    }
    let hour = cityTime.getUTCHours();
    if(hour<0){
        hour=`0${hour}`
    }
    let currentTime=`${hour}:${min}:${second}`;
    let currentDate=`${day} ${Month},${Year} `;
    let utcTimezoneOffSet = `UTC:${favcity.utc_offset}`;

  return (
  <div key={index} className='favCities'> 
  <h2> {favcity.timezone}</h2>
  <p>{currentDate}</p>
  <p>{currentTime}</p>
  <p>{utcTimezoneOffSet}</p>
  <p>{favcity.abbreviation}</p>
</div>
)
  }))}}
   
