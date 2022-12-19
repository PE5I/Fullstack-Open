import { useEffect, useState } from 'react'
import phoneBookService from './services/phonebook'
import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activityMessage, setActivityMessage] = useState(null)
  const [activityType, setActivityType] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPhoneBook => {
        setPersons(initialPhoneBook)
      })
  }, [])

  const updateContact = (newName) => {
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
        
        setActivityMessage(`Updated number for ${newName}`)
        setActivityType('message')
        setTimeout(() => {
          setActivityMessage(null)
        }, 5000)
      })
      .catch(() => {
        setActivityMessage(`Information of ${newName} has already been removed from server`)
        setActivityType('error')
        setTimeout(() => setActivityMessage(null), 5000)
      })

  }

  const addContact = (event) => {
    event.preventDefault()
    let replace = false;
    // check for duplicate
    if (persons.map(name => name.name.toUpperCase())
      .includes(newName.toUpperCase()))
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateContact(newName)
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
      
      setActivityMessage(`Added ${newName}`)
      setActivityType('message')
      setTimeout(() => {
        setActivityMessage(null)
        setActivityType(null)
      }, 5000)
    }
  }

  const handleContactChange = (event) => {
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
    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name} ?`)) {
      console.log("yes");
      phoneBookService
        .deleteId(id)
        .then(returned => {
          setPersons(persons.filter(person => person.id !== id))
        })
      
      setActivityMessage(`Deleted entry for ${name}`)
      setActivityType('message')
      setTimeout(() => {
        setActivityMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={activityType} message={activityMessage} />

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
