import './App.css';
import ClockFace from './clockFace.js';
import FavCity from './FavCity.js'
import Search from './Search.js';





function App() {
  return (
    <div className="App">
    <div className='clockDiv'><ClockFace/></div> 
    <div id='Searchcontainer'> <Search /></div>
     <div className='displayCity'><FavCity/></div>
      <div className='footer'><footer><a href='https://github.com/Jennygreg/world-clock' target="_blank" rel="noreferrer">Open source code</a> by Jennifer</footer></div> 
    </div>
  );
}

export default App;
