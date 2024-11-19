
import React,  {useState} from 'react';
import './Search.css'
import Time from './Time.js'

export default  function Search(){
    const [city, setCity ]=useState(''); 
    const[data, setData]=useState({loaded:false});
    const[error, setError]= useState(null)
    
    const searchHandle= async(e)=>{
            e.preventDefault();
            try{
           const Search= await fetch((`http://worldtimeapi.org/api/timezone/${city}`));
            if(!Search.ok){
                throw new Error(`HTTP error! status: ${Search.status}`)
                 }
            const response=await Search.json();
            console.log(response); 
            setData({loaded:true,Time:response.datetime,
                Timezone:response.timezone,
                Offset:response.utc_offset,
               })
         } 
         catch(error){
            if (error.message.includes('Failed to fetch')){
        setError(<div>
         <p> Invalid Input: Please enter a timezone eg. Africa/Lagos, Europe/London</p>
          <p>Or Check your Netwrok connection and try again.</p></div>)  
            }else{
                setError(`Error: ${error.message}`)
            }
        }
        };  
    
    function City(event){   
        setCity(event.target.value);
    }
 if(data.loaded===true){
    return (<div className='Search' id='container'>
        <form onSubmit={searchHandle}>
        <input type='text' placeholder='Search  a country' className='searchInput' value={city} onChange={City}/>
        <input type='submit'value='search' className='Submit'/>
        </form>
        <Time myData={data}/>
        
       </div>
        )
   }
   else if( data.loaded===false && error!== null){
    return (<div className='Search' id='container'>
        <form onSubmit={searchHandle}>
        <input type='text' placeholder='Search  a country' className='searchInput'value={city} onChange={City}/>
        <input type='submit'value='search' className='Submit'/>
        </form>
        <div style={{ color: 'black' }}>{error}</div>
       </div>)   }
  else{   
    return (<div className='Search' id='container'>
        <form onSubmit={searchHandle}>
        <input type='text' placeholder='Search  a country' className='searchInput'value={city} onChange={City}/>
        <input type='submit'value='search' className='Submit'/>
        </form>
       
       </div>
        )
  }
  
}