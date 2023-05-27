import { useState, useEffect } from "react";
import countriesService from "./services/countriesService";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);

  const showCountries = countries.filter((c) =>
    c.name.common.toLowerCase().startsWith(name.toLowerCase())
  );

  useEffect(() => {
    countriesService.getAll().then((response) => setCountries(response));
  }, []);

  useEffect(() => {
    
    if (showCountries.length == 1) {
      let lat = showCountries[0].capitalInfo.latlng[0];
      let long = showCountries[0].capitalInfo.latlng[1];
      let api_key = process.env.REACT_APP_API_KEY;
      let route = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

      const fetchData = async () => {
        let response = await axios.get(route);
        console.log(response.data);
        setWeatherData(response.data);
      };

      fetchData();
    }
  }, [name]);

  const keyHandler = (e) => {
    setName(e.target.value);
  };

  console.log(showCountries);

  return (
    <div>
      find countries <input onKeyUp={keyHandler} type="text" />
      <Countries
        weatherData={weatherData}
        setName={setName}
        countries={showCountries}
      />
    </div>
  );
};

const Countries = ({ countries, setName, weatherData }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((c) => (
          <p key={c.name.common}>
            {c.name.common} <ShowButton setName={setName} id={c.name.common} />
          </p>
        ))}
      </div>
    );
  } else if (countries.length == 1) {
    countries = countries[0];

    return <Country data={countries} weatherData={weatherData} />;
  } else {
    return <p>There was no country found :(</p>;
  }
};

const ShowButton = ({ id, setName }) => {
  const clickHandler = () => {
    setName(id);
  };

  return <button onClick={clickHandler}>show</button>;
};

const Country = ({ data, weatherData }) => {
  let languages = Object.values(data.languages);
  //let temp = weatherData.main.temp;

  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>Capital(s): </p>
      <ul>
        {data.capital.map((cap) => (
          <li key={cap}>{cap}</li>
        ))}
      </ul>
      <p>Area: {data.area}</p>
      <p>Languages:</p>
      <ul>
        {languages.map((l) => (
          <li key={l.substring(0, 4)}>{l}</li>
        ))}
      </ul>
      <img src={data.flags.png} />

      <h2>Weather in {data.capital[0]}</h2>
      <p>
        Temperature: {weatherData ? `${Math.round((weatherData.main.temp - 273) * 100) / 100} º celsius` : "Loading..."}
      </p>
      <img src={weatherData ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : ''}/>
      <p>
        Wind: {weatherData ? `${Math.round((weatherData.wind.speed) * 100) / 100} km/h` : "Loading..."}
      </p>
    </div>
  );
};

export default App;
