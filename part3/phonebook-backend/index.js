const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => Math.floor((Math.random() * 999999) + 1)

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people.</p>
  <p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
  console.log(`Request to remove person with id ${id}`)
})

app.post('/api/persons', (request, response) =>{
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number is missing'
    })
  }

  if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } 

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
  console.log("Added entry: ", person)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})