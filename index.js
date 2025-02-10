import express from "express"
import cors from "cors"

import  unknownEndpoint from "./middleware/unknownEndPoint.js"


import morgan from "morgan"


import {  getList, 
          getElement,
          deleteElement,
          createElement} from "./Persons.js"


console.log(getList())

const app = express()

app.use(cors())

app.use(express.json())


// Middleware para agregar el body a los tokens de Morgan
morgan.token('body', (req) => JSON.stringify(req.body) || '');

// Configurar Morgan con el token personalizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));


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
      const errorMessage = "Person not founded";
      res.statusMessage = errorMessage
      
      res.status(404)
      res.json({errorMessage}) 
    }
})




const getRandomInt = (max=100000) => {
  return Math.floor(Math.random() * (max + 1));
};


app.post('/api/persons', (req, res) => {
  const {name,number} = req.body;

  if (name != undefined && number != undefined) {

      const unique = getList().find(person => person.name == name)
      const errorMessage = "Name already  used ";
      if(unique != undefined){
        res.statusMessage = errorMessage
        res.status(404)
        return res.json({errorMessage}) 

      }
    

      const person = {name,number, id : getRandomInt()};
      createElement(person);
      res.json(person);
    } else {
      const errorMessage = "Error in data";
      res.statusMessage = errorMessage
      
      res.status(404)
      res.json({errorMessage}) 
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



app.use(unknownEndpoint)









const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})