import { useState, useEffect } from "react";
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPersons(response.data);
      }
    )
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Check if name already exists
    if (persons.filter(person => JSON.stringify(person.name) === JSON.stringify(newName)).length === 0) {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  const personsToShow = filter === '' ? persons : persons.filter(element => element.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm submitHandler={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons toShow={personsToShow}/>
    </div>
  )
}

const Filter = ({changeHandler}) => {
  return (
    <div>
    filter shown with <input onChange={changeHandler}/>
    </div>
  )
}

const PersonForm = ({submitHandler, nameHandler, numberHandler}) => {
  return (
    <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameHandler}/>
        </div>
        <div>
          number: <input onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({toShow}) => {
  return (
    <div>
      {toShow.map(element => <Person key={element.id} name={element.name} number={element.number}/>)}
    </div>
  )
}

const Person = ({name, number}) => {
  return <li>{name} {number}</li>
}


export default App;
