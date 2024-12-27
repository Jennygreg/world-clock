import './App.css';
import ClockFace from './clockFace.js';
import FavCity from './FavCity.js'
import Search from './Search.js';




function App() {
  return (
    <div className="App">
      <div>
        <img src='./img/background2.jpeg' alt='clock'/>
        </div>
     <ClockFace/>
    <div className='Searchcontainer'> <Search /></div>
     <div className='displayCity'><FavCity/></div>
    </div>
  );
}

export default App;
