const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

require('./mongo.js')
const Person = require('./models/Person')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (request, response)=>{
    response.send(`<h1>Backend phonebook</h1>`)
})

app.get('/persons', (request, response)=>{
    const list = Person.find({})
      .then(list=>{
        response.json(list)
      })
})

app.get('/info', (request, response)=>{
    const date = new Date
    const body = `
        <p>La agenda tiene ${persons.length} numeros</p>
        ${date}
    `
    response.send(body)
})

app.post('/persons', (request, response) => {
  const body = request.body
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  if(!body.name || !body.number){
    response.status(400).send('Se recibio un objeto incompleto')
  }
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/persons/:id', (request, response)=>{
    const id = request.params.id
    Person.findById(id).then(findPerson=>response.json(findPerson))
})

app.put('/persons/:id', (request, response)=>{
  const id = request.params.id
  const update = request.body
  const personUpdated =  {
    name: update.name,
    number: update.number,
  }
  Person.findByIdAndUpdate(id, personUpdated, { new: true })
  .then(result => 
    response.json(result)
  )
})

app.delete('/persons/:id', (request, response)=>{
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(console.log('la nota fue eliminada'))
})


app.use((request, response)=>{
    response.status(404).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto', PORT)
})