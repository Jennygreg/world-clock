import './App.css';
import ClockFace from './clockFace.js';
import FavCity from './FavCity.js'
import Search from './Search.js';





function App() {
  return (
    <div className="App">
    <div className='clockDiv'><ClockFace/></div> 
    <div className='Searchcontainer'> <Search /></div>
     <div className='displayCity'><FavCity/></div>
      <div><footer><a href='' target="_blank">Open source code</a> by Jennifer</footer></div> 
    </div>
  );
}

export default App;
