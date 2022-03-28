import React from 'react'
import Country from './Country'
import OneCountry from './OneCountry'

const Countries = ({ countries, filter }) => {

  const search = countries.filter(country => 
    country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  
  if (search.length < 11 && search.length > 1) {
    return(
    <div>
      {search.map(country =>
        <Country key={country.name.common} name={country.name.common} />
      )}
    </div>
    )
  } else if (search.length === 1) {
    return(
      <div>
        <OneCountry title={search[0].name.common} capital={search[0].capital} 
          area={search[0].area} languages={search[0].languages} flag={search[0].flags} />
      </div>
    )
  } else if (search.length === 0) {
    return(
      <div>
        No matches
      </div>
    )
  } else {
    return(
      <div>
        Too many matches, please narrow your search
      </div>
    )
  }
}

export default Countries