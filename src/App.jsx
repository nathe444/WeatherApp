import React, { useEffect, useState } from "react";
import "./components/css/App.css";

function App() {
  let [city, setCity] = useState("addis ababa");

  let [search,setSearch]=useState('');

  let [fetched, setfetched] = useState({});

  let [isFetched,setIsFetched]=useState(false);

  let date = new Date();

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let currentTime = new Date().toLocaleTimeString();

  // let apiKey = "70b7a20055e04716059ca7fee0424204";

  let apiKey = "6a9aed96e822f019b7dd48c20f279e00";

  const inputReference= React.useState(null);

  let handleSubmit = ()=>{
    setCity(search);
    inputReference.current.value='';
    console.log(city)
  }


  let handleChange = (e) =>
    setSearch(
      [e.target.name] = e.target.value,
      );
    

  let temp = (fetched.main?.temp - 273.15).toFixed(2);
  let tempMin = (fetched.main?.temp_min - 273.15).toFixed(2);
  let tempMax = (fetched.main?.temp_max - 273.15).toFixed(2);

  useEffect(() => {
    const fetchWeather = async () => {

      try{
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
  
        let result= (await response.json());
        setfetched(result);
        setIsFetched(true);
        
      } catch (err){
        console.error(err);
      }
      
    };

    fetchWeather();
  }, [city]);


  return (
    <>
      <div className="main-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search City"
            className="search"
            name="search"
            ref={inputReference}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>
            <img src="/search.png" alt="" className="search-img" />
          </button>
        </div>

        <div className="data-container">
          <h1 className="city">{fetched.name}</h1>
          <h2 className="date">{date.toLocaleDateString("en-US", options)}</h2>
          <h2 className="time">{currentTime}</h2>
          <hr />

          <div>
           { isFetched ?<img className="img" src={`https://openweathermap.org/img/wn/${fetched.weather[0].icon}@2x.png`}  alt="" /> : <img src="Assets/loading-transparent.gif" alt="" className="img" />  }
          </div>

          <h1 className="temprature">{temp}&#xb0;C </h1>

          {/* <h1 className="weather-condition">{fetched.weather[0].main}</h1> */}
          <h2 className="range">
            {tempMin}&#xb0;C | {tempMax}&#xb0;C
          </h2>

          <div className="humidity-wind-container">

            <div className="bottom-left">
              <img src="/Assets/humidity.png" alt="" className="humidity"/>
              <div><p>{fetched.main?.humidity}%</p>
              <h2>Humidity</h2></div>
            </div>

            
            <div className="bottom-right">
             <img src="/Assets/wind.png" alt="" className="wind"/>
             <div><p>{fetched.wind?.speed} km/h</p>
             <h2>Wind Speed</h2></div>
            </div>

            
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
