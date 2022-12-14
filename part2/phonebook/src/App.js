import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name : 'Arto Hellas'}
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    // Check if name already exists
    if (persons.filter(person => JSON.stringify(person) === JSON.stringify({name: newName})).length === 0) {
      setPersons(persons.concat({name: newName}));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {persons.map(element => <li key={element.name}>{element.name}</li>)}
      </div>

    </div>
  )
}

export default App;
