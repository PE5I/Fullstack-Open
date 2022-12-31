
const ListItem = ({ item }) => {
  return (
    <div>
      <li>{item}</li>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  if (country.hasOwnProperty(country.languages)) {
    console.log("exited countryInfo without running");
    return
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital ? country.capital.at(0) : ''}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages)
              .map(language => 
                <ListItem key={JSON.stringify(language)} item={language} /> 
              )}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length === 1) {
    return (
      <div>
        <CountryInfo country={countries.at(0)} />
      </div>
    )
  }
  if (countries.length < 10) {
    return (
      <div>
        <ul>
          {countries.map(country => <ListItem item={country.name.common} />)}
        </ul>
      </div>
    )
  }
}

const Country = ({ countries, search }) => {
  
  // const filterBySearch = countries.filter(countries => search.length === 0
  //               ? countries : countries.name.common.toUpperCase().includes(search.toUpperCase()))

  return (
    <div>
      {<CountryList countries={countries.filter(countries => search.length === 0
                ? countries : countries.name.common.toUpperCase().includes(search.toUpperCase()))} />}
    </div>
  )
}

export default Country