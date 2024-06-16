import React,  {useState} from 'react';
import './Search.css'

export default  function Search(){
    const [city, setCity ]=useState(null); 
    const[Time, setTime]=useState(null);
    
function searchHandle  (event){
    event.preventDefault();
async function search(){
    try{
   const Search= await fetch(${city}`)
   const searchData= await Search.json();
   setTime(searchData.time)}
   catch(error){
    console.log(error)
   }

     
    }
search()}
    
    function City(event){
        setCity(event.target.value);
    }

return (<div className='Search'>
<form onSubmit={searchHandle}>
    <input type='text' placeholder='Search  a country' className='searchInput' onChange={City}/>
    <input type='submit'value='search' className='Submit'/>
</form>
<div>
    <p>{city}:{Time}</p>
</div>
</div>)

}