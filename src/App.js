import './App.css';
import ClockFace from './clockFace.js';
import FavCity from './FavCity.js'
import Search from './Search.js';
import backgroundimg from "./background2.jpeg"




function App() {
  return (
    <div className="App">
    <div className='clockDiv'><ClockFace/></div> 
    <div className='Searchcontainer'> <Search /></div>
     <div className='displayCity'><FavCity/></div>
    </div>
  );
}

export default App;
