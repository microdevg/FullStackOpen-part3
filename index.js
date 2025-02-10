import express from "express"

import {getList, getElement, deleteElement} from "./Persons.js"


console.log(getList())

const app = express()



app.use(express.json())






app.get('/', (request, response) => {
  response.send('<h1>Phone book</h1>')
})

app.get('/api/persons', (request, response) => {

  let list = getList();
  response.json(list)
})



app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const person  =getElement(id);
  if (person) {
      response.json(person)
    } else {
      const errorNotFounded = "Person not founded";
      response.statusMessage = errorNotFounded
      response.send(`<h3>${errorNotFounded}</h3>`)
      response.status(404).end()
    }
})





app.delete('/api/persons/:id', (request, response)=>{
  const id = parseInt(request.params.id)
  const person = deleteElement(id);
  response.json(person);

});



const generateId = () => {
  const maxId = getList().length > 0
    ? Math.max(...getList().map(n => n.id))
    : 0
  return maxId + 1
}

app.get("/info",(req,res)=>{
  const num = getList().length;
  const now = new Date();
  const message = `<p>Phonebook has info for ${num} people.</p> <p>${now}<p/>`
  res.send(message);
})












const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})