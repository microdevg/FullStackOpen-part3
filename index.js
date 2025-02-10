import express from "express"

import Persons from "./Persons.js"




const app = express()



app.use(express.json())






app.get('/', (request, response) => {
  response.send('<h1>Phone book</h1>')
})

app.get('/api/persons', (request, response) => {

  let list = Persons.getList();
  response.json(list)
})



app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const note = Persons.getList().find(note => note.id === id)
  if (note) {
      response.json(note)
    } else {
      const errorNotFounded = "Person not founded";
      response.statusMessage = errorNotFounded
      response.send(`<h3>${errorNotFounded}</h3>`)
      response.status(404).end()
    }
})


const generateId = () => {
  const maxId = Persons.getList().length > 0
    ? Math.max(...Persons.getList().map(n => n.id))
    : 0
  return maxId + 1
}

app.get("/info",(req,res)=>{
  const num = Persons.getList().length;
  const now = new Date();
  const message = `<p>Phonebook has info for ${num} people.</p> <p>${now}<p/>`
  res.send(message);
})












const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})