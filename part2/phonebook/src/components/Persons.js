import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, removeFunction }) => {
  
  const result = persons.filter(person => 
    person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  return (
    <div>
      {result.map(person =>
        <Person key={person.id} id={person.id} name={person.name} number={person.number}
        removeFunction={removeFunction} />
      )}
    </div>
  )
}

export default Persons