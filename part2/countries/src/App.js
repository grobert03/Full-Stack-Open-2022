import {useState, useEffect} from "react";
import countriesService from "./services/countriesService";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState(' ');

  useEffect(() => {
    countriesService.getAll().then(response => setCountries(response));
  }, []);

  const keyHandler = (e) => {
    setName(e.target.value);
  }

  const showCountries = countries.filter(c => c.name.common.toLowerCase().startsWith(name.toLowerCase()));
  console.log(showCountries);

  return (
    <div>
      find countries <input onKeyUp={keyHandler} type='text'/>
      <Countries setName={setName} countries={showCountries}/>
    </div>
  )
}

const Countries = ({countries, setName}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length < 10 && countries.length > 1) {

    return (
      <div>
        {countries.map(c => <p key={c.name.common}>{c.name.common} <ShowButton setName={setName} id={c.name.common}/></p>)}
      </div>
    )
  } else if (countries.length == 1) {
    countries = countries[0];
    
    return (
      <Country data={countries}/>
    )
  } else {
    return <p>There was no country found :(</p>
  }
}

const ShowButton = ({id, setName}) => {
  const clickHandler = () => {
    setName(id);
  }

  return <button onClick={clickHandler}>show</button>
}

const Country = ({data}) => {
  let languages = Object.values(data.languages);
  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>Capital(s): </p>
      <ul>{data.capital.map(cap => <li key={cap}>{cap}</li>)}</ul>
      <p>Area: {data.area}</p>
      <p>Languages:</p>
      <ul>
        {languages.map(l => <li key={l.substring(0, 4)}>{l}</li>)}
      </ul>
      <img src={data.flags.png}/>
    </div>
  )
}

export default App;
