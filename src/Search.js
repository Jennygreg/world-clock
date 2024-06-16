import React from 'react';
import './Search.css'
export default  function Search(){
return (<div className='Search'>
<form>
    <input type='Search' placeholder='Search  a country' className='searchInput'/>
    <input type='submit'value='search' className='Submit'/>
</form>
</div>)

}