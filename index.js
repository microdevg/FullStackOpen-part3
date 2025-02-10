import express from "express"

import {  getList, 
          getElement,
          deleteElement,
          createElement} from "./Persons.js"


console.log(getList())

const app = express()



app.use(express.json())






app.get('/', (req, res) => {
  res.send('<h1>Phone book</h1>')
})

app.get('/api/persons', (req, res) => {

  let list = getList();
  res.json(list)
})



app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const person  =getElement(id);
  if (person) {
      res.json(person)
    } else {
      const errorNotFounded = "Person not founded";
      res.statusMessage = errorNotFounded
      res.send(`<h3>${errorNotFounded}</h3>`)
      res.status(404).end()
    }
})




const getRandomInt = (max=100000) => {
  return Math.floor(Math.random() * (max + 1));
};
app.post('/api/persons', (req, res) => {
  

  const {name,number} = req.body;

  if (name != undefined && number != undefined) {
    const person = {name,number, id : getRandomInt()};
      createElement(person);
      res.json(person);
    } else {
      const errorMessage = "Error in data";
      res.statusMessage = errorMessage
      res.send(`<h3>${errorMessage}</h3>`)
      res.status(404).end()
    }
})




app.delete('/api/persons/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  const person = deleteElement(id);
  res.json(person);

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