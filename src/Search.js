
import React,  {useState} from 'react';
import './Search.css'
import Time from './Time.js'



export default  function Search(){
    const [city, setCity ]=useState(''); 
    const[data, setData]=useState({loaded:false});
   
    const searchHandle= async(city)=>{
      const apiKey='c89279828a9f559c9ea7c9f2ad6d30af';
      const url=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
            
            try{
              const citySearch= await fetch(url);
              if(!citySearch.ok){
                throw new Error(`HTTP error! status: ${Search.status}`)
              }
              const cityResult=await citySearch.json();
              console.log(cityResult)
              const lat=cityResult[0].lat;
              const lon=cityResult[0].lon
              const timeApiKey='HI8QZIPCUTVM';
              const timeUrl=`https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&&lng=${lon}`
              try{
              const timeSearch= await fetch(timeUrl);
              const timeResult=  await timeSearch.json();
              return timeResult;
              }
            catch(error){
console.log(error.message)
            }}
              catch(error){
                console.log(error.message) 
              }
    }
      async function SearchInput(e){ 
            e.preventDefault()
          const response= await searchHandle(city)
           setData({loaded:true, response})
          
            }
    function City(event){   
        setCity(event.target.value);
    }
     
 
      if(data.loaded===false ){return(
        <div className="Search">
        <form onSubmit={SearchInput}>
          <input
              type="text"
              placeholder="Search a country e.g Europe/Berlin"
              className="searchInput"
              value={city}
              onChange={City}
              name='searchValue'
             id="searchInput"
          />
          <input type="submit" value="search" className="Submit" />
        </form></div>
      )}  else {return (
        <div className="Search" >
          <form onSubmit={SearchInput}>
            <input
                type="text"
                placeholder="Search a country e.g Europe/Berlin"
                className="searchInput"
                value={city}
                onChange={City}
                name='searchValue'
               id="searchInput"
            />
            <input type="submit" value="search" className="Submit" />
          </form>
           <Time myData={data} />
          </div>)}
         
  ;
}
