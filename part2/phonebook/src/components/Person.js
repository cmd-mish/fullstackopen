import React from 'react'

const Person = ({ id, name, number, removeFunction }) => 
  <div>
    {name} {number}
    <button onClick={() => removeFunction(id, name)}>delete</button>
  </div>

export default Person