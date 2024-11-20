
import React,  {useState} from 'react';
import './Search.css'
import Time from './Time.js'
import FavCity from './FavCity.js';

export default  function Search(){
    const [city, setCity ]=useState(''); 
    const[data, setData]=useState({loaded:false});
    const [errorMessage, setErrorMessage]=useState(null)
        
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
            if(error.message.includes(429)){
                setErrorMessage('Too Many Request, Please Wait for 2mins')    
            }
            else if (error.message.includes('Failed to fetch')){
                setErrorMessage(<div><p>Cannot find city/country: Please enter a valid search input eg Africa/Lagos, Europe/London..</p>
                <p>Network Error: Also check your Connection and try again</p></div>)
            }else{
                setErrorMessage(error.message )
            }
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
     
 if (errorMessage !==null ){
    return(
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
          <div style={{ color: 'black' }}>{errorMessage}</div>
      <FavCity/>
    </div>)
        
       } else if (data.loaded===true) { return (
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
            <Time myData={data.response} />
            <FavCity/></div>)}
        else{
           return(
            <div className="Search" id="container">
              <form onSubmit={SearchInput}>
                <input
                   type="text"
                   placeholder="Enter search e.g Africa/Lagos, Europe/London..."
                   className="searchInput"
                   value={city}
                   onChange={City}
                   name='Searchvalue}'
                  id="searchInput"
                  autoFocus={false}
                />
                <input type="submit" value="search" className="Submit" />
              </form>
          <FavCity/>
        </div>)
      }
    
  ;
}
