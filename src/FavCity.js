import React,{useState, useEffect} from 'react'
export default function FavCity(){
    const favCities=["Africa/Lagos", "Europe/London","Asia/Tokyo","America/Santiago","Europe/Berlin","America/New_York",];
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
setLoading(false)
        }catch(error){
          console.log(error.message)
          setLoading(false)
          setError(error.message)
        }
      }
    fetchCityData()
    console.log(cityData)
  },[])
    
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
  {return<div>could not load cities: try again...</div>}
if(loading){

}
 else{return(cityData.map((favcity, index)=>{
  const Days=['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
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

  return (<div key={index}> 
  <h1> {favcity.timezone}</h1>
  <h2>{currentDate}</h2>
  <h3>{currentTime}</h3>
  <h4>{utcTimezoneOffSet}</h4>
  <p>{favcity.abbreviation}</p>
  </div>
  )
  }))}}
   
