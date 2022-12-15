import { useState } from 'react' 
import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons);
    // check for duplicate
    if (persons.map(name => name.name.toUpperCase())
              .includes(newName.toUpperCase())) 
    {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    if (newName.length !== 0) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterFormChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter text={"filter shown with"} value={searchTerm} onChange={handleFilterFormChange} />

      <PersonForm textName={"name:"} textNumber={"number:"} 
                  valueName={newName} valueNumber={newNumber}
                  onSubmit={addContact} onChangeName={handleContactChange} onChangeNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Contact persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App;
