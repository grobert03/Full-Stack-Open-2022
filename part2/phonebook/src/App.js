import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name : 'Arto Hellas',
     number: '040-1234567'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  const addPerson = (event) => {
    event.preventDefault();

    // Check if name already exists
    if (persons.filter(person => JSON.stringify(person.name) === JSON.stringify(newName)).length === 0) {
      setPersons(persons.concat({name: newName, number: newNumber}));
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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(element => <Person key={element.name} name={element.name} number={element.number}/>)}
      </div>

    </div>
  )
}

const Person = ({name, number}) => {
  return <li>{name} {number}</li>
}

export default App;
