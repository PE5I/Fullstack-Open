import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  
  return (
    <div>
      <form>
        <div>
          find countries <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>
      <div>
        <Country countries={countries} search={search} />
      </div>
    </div>
  )
}

export default App;
