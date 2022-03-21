import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
  const result = persons.filter(person => 
    person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  return (
    <div>
      {result.map(person =>
        <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default Persons