import React, {useState} from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0e63e5db0f02a2123de4feed94b878ed`

const searchLocation = (event) => {
  if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      if(response.data) {
        setData(response.data);
        setError('');
        } else {
          setData({}); 
          setError('No city found.');
          }
        })
        .catch((error) => {
          setData({}); 
          setError('Error fetching data. Please try again.');
          console.error('Error fetching data:', error);
        });
    setLocation('')
  }
}

  return (
    <div className='app'>
      <div className='search'>
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        <div className="top">
          <div className="location">
            {data.sys ? <p className='bold'>{data.name}, {data.sys.country}</p> : null} 
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

  {data.name != undefined && 
    <div className="bottom">
    <div className="feels">
      {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}  
      <p>Feels Like</p>
    </div>
    <div className="humidity">
      {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}
      <p>Humidity</p>
    </div>
    <div className="wind">
      {data.main ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
      <p>Wind Speed</p>
    </div>
  </div>
  }
      </div>
    </div>
  </div>
  );
}

export default App;
