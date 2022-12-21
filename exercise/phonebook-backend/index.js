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

app.put('/api/persons/:id', (request, response, next) => {
  // const query = { name: request.body.name }
  const { name, number } = request.body
  console.log(request.params);
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number }, 
    { new: true, runValidators: true, context: 'query'}
  )
    .then(updatedPerson => {
      if (!updatedPerson) {
        return response.json({error: 'id does not exist'})
      }
      
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.findOne({ name: body.name }, (error, returnedPerson) => {
      if (returnedPerson) {
        console.log('sorry there duplicate');
        return response.status(400).json({
          error: 'name already exists in the database'
        })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })

        person.save()
          .then(savedNote => {
            console.log(savedNote);
            response.json(savedNote)
          })
          .catch(error => next(error))
      }
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  response.status(400).json({error: error.message})

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server started listening on port ${PORT}`);