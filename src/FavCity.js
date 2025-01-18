import React,{useState, useEffect} from 'react'
import LoaderIcon from "react-loader-icon";
import  './FavCity.css'
export default function FavCity(){
    const favCities=["Lagos", "London","New York","Tokyo", "Berlin","Santiago"];
    const [cityData, setCityData]= useState([{}]);
    const[loading, setLoading]=useState(true)
    const[error, setError]=useState('');
    const myApiKey='c89279828a9f559c9ea7c9f2ad6d30af';
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    useEffect(()=>{
     const fetchCityData= async()=>{
      
        try{
          const responses= await Promise.all(favCities.map((city)=> 
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${ myApiKey}`)));
          const searchResponse= await Promise.all(responses.map((response)=>
          response.json()));
          const cordinates= searchResponse.map((cordinate)=>{
            return{
              lat:cordinate[0].lat,
              lon:cordinate[0].lon

            }})
            const timezoneData=  await Promise.all(cordinates.map((cityCordinates)=>
              fetch(` https://api.geonames.org/timezoneJSON?&lat=${cityCordinates.lat}&lng=${cityCordinates.lon}&username=mizbella`)
            ))
         const timeZoneResponse= await Promise.all(timezoneData.map((response)=>response.json()))
          setCityData (timeZoneResponse)
          
          }
        catch(error){
          console.log(error.message)
          if (error.includes('Failed to fetch') || error.includes('401')|| error.includes('Bad Gateway')) {
            // Handle network or server errors//
            setError("No network:Check Connection")

          } else if (error.includes("Can't find city")) {
            // Handle city not found error
            setError("City not found enter valid search");
            // You can also display a user-friendly error message to the user
          } else {
            // Handle other errors
            console.error("An unknown error occurred try agin");
          }
        }finally {
          setLoading(false);
          await delay(1000)
        }
      }
    fetchCityData()
   // eslint-disable-next-line react-hooks/exhaustive-deps   
  },[])  // Empty dependency array is intentional, as data is fetch once on mount
    console.log(cityData)
  useEffect(() => {
    const intervalId = setInterval(() => {
       // Check if cityData is an array
      if (Array.isArray(cityData)){
        setCityData((prevCityData) =>
          prevCityData.map((city) => {
            const utcOffset = city.gmtOffset
            console.log(utcOffset)
            const cityCurrentTime = new Date();
            const cityTime = new Date(cityCurrentTime.getTime() + (utcOffset * 60 * 60 * 1000));
            return { ...city, datetime: cityTime};
        }));  
}
},1000); 
return () => clearInterval(intervalId);
    
  }, [cityData]);
 
  if (error){
    return (<div id='error' className='error'>{error}</div>)
} 

if(loading){
return(
<div className='loadingIcon'>
  <LoaderIcon type={"spin"}/>
<p>Loading</p>
</div>)
}
 else{
  
  return(cityData.map((favcity, index)=>{
  const Days=['Sun','Mon','Tues','Wed','Thurs', 'Fri','Sat'];
  const Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const utcoffset = favcity.gmtOffset;
  const cityCurrentTime = new Date();
  const cityTime = new Date(cityCurrentTime.getTime() + (utcoffset * 60 * 60 * 1000));
  const options = { 
    timeZone: favcity.timezoneId,  
    timeZoneName: 'short' };
const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
const parts = dateTimeFormat.formatToParts(new Date());
let abbr = '';
parts.forEach(part => {
  if (part.type === 'timeZoneName') {
    abbr = part.value;
  }
});
    const day=Days[cityTime.getDay()];
    const Month=Months[cityTime.getMonth()]
    const Year = cityTime.getFullYear();
    let second =cityTime.getUTCSeconds().toString().padStart(2, 0);
    let min=cityTime.getUTCMinutes().toString().padStart(2, 0);
    let hour = cityTime.getUTCHours().toString().padStart(2, 0);
    let currentTime=`${hour}:${min}:${second}`;
    let currentDate=`${day} ${Month},${Year} `;
    let utcTimezoneOffSet = `UTC:${utcoffset >= 0 ? '+' : '-'}${Math.abs(utcoffset).toString().padStart(2, '0')}`;

  return (<div id="favWrap">
  <div key={index} id='favCities'> 
  <h2> {favcity.timezoneId}</h2>
  <p>{currentDate}</p>
  <p>{currentTime}</p>
  <p>{utcTimezoneOffSet}</p>
  <p>{abbr}</p>
</div></div>
)
  }))}}
   
