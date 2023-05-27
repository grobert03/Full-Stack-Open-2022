import { useState, useEffect } from "react";
import personService from "./services/persons";
import persons from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNotes) => setPersons(initialNotes));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    let newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    // Check if name already exists
    let user = persons.filter(
      (person) => JSON.stringify(person.name) === JSON.stringify(newName)
    );
    if (user.length === 0) {
      personService.create(newObject).then((newObject) => {
        setPersons(persons.concat(newObject));
      });
    } else {
      let userId = user[0].id;
      let confirmar = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirmar) {
        personService
          .update(userId, { ...newObject, id: userId })
          .then((response) =>
            setPersons(persons.map((p) => (p.id == userId ? response : p)))
          );
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((element) =>
          element.name.toLowerCase().includes(filter)
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        submitHandler={addPerson}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        setPersons={setPersons}
        toShow={personsToShow}
        persons={persons}
      />
    </div>
  );
};

const Filter = ({ changeHandler }) => {
  return (
    <div>
      filter shown with <input onChange={changeHandler} />
    </div>
  );
};

const PersonForm = ({ submitHandler, nameHandler, numberHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input onChange={nameHandler} />
      </div>
      <div>
        number: <input onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ toShow, setPersons, persons }) => {
  return (
    <div>
      {toShow.map((element) => (
        <Person
          key={element.id}
          person={element}
          setPersons={setPersons}
          persons={persons}
        />
      ))}
    </div>
  );
};

const Person = ({ person, setPersons, persons }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <DeleteButton
        key={"boton-" + person.id}
        setPersons={setPersons}
        name={person.name}
        id={person.id}
        persons={persons}
      />
    </li>
  );
};

const DeleteButton = ({ id, setPersons, persons, name }) => {
  const clickHandler = () => {
    let mensaje = `Delete ${name}?`;
    if (window.confirm(mensaje)) {
      personService
        .deletePerson(id)
        .then((response) => setPersons(persons.filter((e) => e.id != id)));
    }
  };
  return <button onClick={clickHandler}>delete</button>;
};
export default App;
