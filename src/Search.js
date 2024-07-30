import React,  {useState, useEffect} from 'react';
import './Search.css'

export default  function Search(){
    const [city, setCity ]=useState(null); 
    const[Time, setTime]=useState(null);
    const[loading, setLoading]=useState(null)
    const[timezone, setTimezone]=useState(null)
    
    
    
async function searchHandle(e){
    e.preventDefault();
    setLoading(true);
    
    try{
   const Search= await fetch((`http://worldtimeapi.org/api/timezone/${city}`));
    const searchData=  await Search.json();
    const date= new Date(searchData.datetime);
    const UTC= date.toUTCString();
   const EST= new Date(searchData.datetime).toLocaleString('nl-NL', {timeZone: 'Europe/Berlin'});
   const CET= new Date(searchData.datetime).toLocaleString('nl-NL', {timeZone: 'America/New_York'});
   console.log(UTC)
   console.log(EST);
   console.log(CET);  
    setTime({})
    console.log(Time)
   setTimezone(searchData.timezone); 
 } 
 
 catch(error){
    console.log(error)
   }
    
    };  
    
;

    
    function City(event){
        setCity(event.target.value);
    }

return (<div className='Search'>
<form onSubmit={searchHandle}>
    <input type='text' placeholder='Search  a country' className='searchInput' onChange={City}/>
    <input type='submit'value='search' className='Submit'/>
</form>
<div>
    {loading}
    <p>{timezone}<span>{Time}</span><span></span><span>EST</span><span>CET</span></p>
</div>
</div>)

}