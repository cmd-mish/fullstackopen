import React from 'react'
import { useState } from 'react'
import OneCountry from './OneCountry'

const Country = ({ info }) =>{
  const [showDetails, setDetails] = useState(false)

  return(
    <div>
      {info.name.common} <button onClick={() => setDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails 
        ? <OneCountry title={info.name.common} capital={info.capital} 
          area={info.area} languages={info.languages} flag={info.flags} /> 
        : ''}
    </div>
  )
}

export default Country