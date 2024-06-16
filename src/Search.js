import React,  {useState} from 'react';
import './Search.css'

export default  function Search(){
    const [city, setCity ]=useState("null"); 
    function searchHandle(){
       let searchCity = {city};
       console.log(searchCity)
    }
    function City(event){
        setCity(event.target.value);
    }
    
return (<div className='Search'>
<form onClick={searchHandle}>
    <input type='Search' placeholder='Search  a country' className='searchInput' onChange={City}/>
    <input type='submit'value='search' className='Submit'/>
</form>
</div>)

}