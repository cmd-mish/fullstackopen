import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {

      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        const id = persons.find(n => n.name === newName).id
        const person = persons.find(n => n.id === id)
        const changedPerson = {...person, number: newNumber}

        numberService
          .update(id, changedPerson)
          .then(returnedNumber => {
            setPersons(persons.map(person => person.id !== id ? person : returnedNumber))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(error)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      numberService
        .create(nameObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(error)
        })
      }
    }

    const removePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        numberService
        .remove(id)
        .then(returnedNumber => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(error)
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} change={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} removeFunction={(id, name) => removePerson(id, name)} />
    </div>
  )
}

export default App