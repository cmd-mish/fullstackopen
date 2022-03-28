import React from 'react'

const Search = ({ value, change }) => 
  <div>
    find countries <input value={value} onChange={change} />
  </div>

export default Search