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













const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})