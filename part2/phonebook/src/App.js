import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


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
      <div>
        filter shown with <input onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
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
        {personsToShow.map(element => <Person key={element.id} name={element.name} number={element.number}/>)}
      </div>

    </div>
  )
}

const Person = ({name, number}) => {
  return <li>{name} {number}</li>
}

export default App;
