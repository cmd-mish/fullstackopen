import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, newSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearch = (event) => {
    newSearch(event.target.value)
  }

  return (
    <div>
      <Search value={search} change={handleSearch} />
      <Countries countries={countries} filter={search} />
    </div>
  )
}

export default App;
