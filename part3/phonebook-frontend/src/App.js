import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

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
    const nameObject = {
      name: newName,
      number: newNumber
    }

    numberService
      .create(nameObject)
      .then(returnedNumber => {
        setPersons(persons.concat(returnedNumber))
        displayNotification(`Added ${newName}!`, "success")
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(`id: ${nameObject.id}`, error)
        displayNotification(`Couldn't add ${newName} to the phonebook!`, "error")
      })
    }

    const removePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        numberService
        .remove(id)
        .then(returnedNumber => {
          setPersons(persons.filter(person => person.id !== id))
          displayNotification(`Removed ${name}!`, "success")
        })
        .catch(error => {
          displayNotification(`Couldn't remove ${name} from the phonebook!`, "error")
          setPersons(persons.filter(n => n.id !== id))
        })
      }
    }

    const displayNotification = (message, status) => {
      setNotification(message)
      setNotificationStatus(status)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} status={notificationStatus} />
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