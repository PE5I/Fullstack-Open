import { useEffect, useState } from 'react'
import phoneBookService from './services/phonebook'
import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPhoneBook => {
        setPersons(initialPhoneBook)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons);
    // check for duplicate
    if (persons.map(name => name.name.toUpperCase())
              .includes(newName.toUpperCase())) 
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }
  
        phoneBookService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons
              .filter(person => person.id !== personObject.id)
              .concat(returnedPerson)
            )
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    if (newName.length !== 0) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.at(persons.length)+1
      }

      phoneBookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const handleDelete = id => (event) => {
    event.preventDefault()
    console.log(event);

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      console.log("yes");
      phoneBookService
        .deleteId(id)
        .then(returned => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter text={"filter shown with"} value={searchTerm} onChange={handleFilterFormChange} />

      <PersonForm textName={"name:"} textNumber={"number:"} 
                  valueName={newName} valueNumber={newNumber}
                  onSubmit={addContact} onChangeName={handleContactChange} onChangeNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Contact onClick={handleDelete} persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App;
