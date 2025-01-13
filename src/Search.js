
import React,  {useState} from 'react';
import './Search.css'
import Time from './Time.js'



export default  function Search(){
    const [city, setCity ]=useState(''); 
    const[data, setData]=useState({loaded:false});
    const url=`https://worldtimeapi.org/api/timezone/${city}`;
   
    const searchHandle= async(city)=>{
            
            try{
              const citySearch= await fetch(url);
              if(!citySearch.ok){
                throw new Error(`HTTP error! status: ${Search.status}`)
              }
              const cityReponse=await citySearch.json();
              return cityReponse; 
            }
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
        <div className="Search" id="Searchcontainer">
        <form onSubmit={SearchInput}>
          <input
              type="text"
              placeholder="Search a country e.g Europe/Berlin"
              className="searchInput"
              value={city}
              onChange={City}
              name='Searchvalue}'
             id="searchInput"
          />
          <input type="submit" value="search" className="Submit" />
        </form></div>
      )}  else {return (
        <div className="Search" id="container">
          <form onSubmit={SearchInput}>
            <input
                type="text"
                placeholder="Search a country e.g Europe/Berlin"
                className="searchInput"
                value={city}
                onChange={City}
                name='Searchvalue}'
               id="searchInput"
            />
            <input type="submit" value="search" className="Submit" />
          </form>
           <Time myData={data} />
          </div>)}
         
  ;
}
