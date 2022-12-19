const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request['body'])
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  Person.findOne({ name: body.name }, (error, person) => {
    if (person) {
      console.log('sorry there duplicate');
      return response.status(400).json({
        error: 'name already exists in the database'
      })
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person.save().then(savedNote => {
        response.json(savedNote)
      })
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const numEntries = persons.length
  let content = `<p>Phonebook has info for ${numEntries} people</p>`
  content += `<p>${new Date()}</p>`
  
  // response.set('Content-Type', 'text/html')
  response.send(content)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server started listening on port ${PORT}`);