import React from 'react'

const Filter = ({ value, change }) => 
  <div>
    filter shown with <input value={value} onChange={change} />
  </div>

export default Filter