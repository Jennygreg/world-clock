
import React,  {useState} from 'react';
import './Search.css'
import Time from './Time.js'



export default  function Search(){
    const [city, setCity ]=useState(''); 
    const[data, setData]=useState({loaded:false});
   
        
    
    const searchHandle= async(city)=>{
            
            try{
           const Search= await fetch((`http://worldtimeapi.org/api/timezone/${city}`));
            if(!Search.ok){
                throw new Error(`HTTP error! status: ${Search.status}`)
                 }
            const response=await Search.json();
            console.log(response); 
            return response
         } 
         catch(error){
            
            console.log(error.message)
       }
        };  
       
      async function SearchInput(e){ 
            e.preventDefault()
          const response= await searchHandle(city)
          console.log(response)
           setData({loaded:true, response})
          
            }
    function City(event){   
        setCity(event.target.value);
    }
     
 
      if(data.loaded===false ){return(
        <div className="Search" id="container">
        <form onSubmit={SearchInput}>
          <input
              type="text"
              placeholder="Search a country"
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
                placeholder="Search a country"
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
