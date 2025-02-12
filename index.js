import express from "express"
import cors from "cors"

import  unknownEndpoint from "./middleware/unknownEndPoint.js"


import morgan from "morgan"


import {  getList, 
          getElement,
          deleteElement,
          createElement,
          getElementByName} from "./Persons.js"


console.log(getList())

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))



// Middleware para agregar el body a los tokens de Morgan
morgan.token('body', (req) => JSON.stringify(req.body) || '');

// Configurar Morgan con el token personalizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));


app.get('/', (req, res) => {
  res.send('<h1>Phone book</h1>')
})

app.get('/api/persons',async (req, res) => {

  

  const list = await  getList();
    res.json(list)


})



app.get('/api/persons/:id', async (req, res) => {
  const id = req.params.id
  const person  = await getElement(id);
  console.log("person with id:",id, person)
  if (person) {
      res.json(person)
    } else {
      const errorMessage = "Person not founded";
      res.statusMessage = errorMessage
      
      res.status(404)
      res.json({errorMessage}) 
    }
})




app.get('/api/persons/name/:name', async (req, res) => {
  const name = req.params.name
  const person  = await getElementByName(name);
  console.log("person is",person)
  if (person ) res.json(person)
  else{
      const errorMessage = "Person not founded";
      res.statusMessage = errorMessage
      res.status(404)
      res.json({errorMessage}) 
    }
})






app.post('/api/persons',  async (req, res) => {
  const {name,number} = req.body;
  if (name != undefined && number != undefined) {
      let unique = await getList()
      unique = unique.find(p=>p.name ===name);
      console.log(`set unique ${unique}`);
      const errorMessage = "Name already  used ";
      if(unique != undefined){
        res.statusMessage = errorMessage
        res.status(404)
        return res.json({errorMessage}) 
      }
      const person = {name,number};
      const ret = await createElement(person)

      res.json(ret)

    } else {
      const errorMessage = "Error in data";
      res.statusMessage = errorMessage
      
      res.status(404)
      res.json({errorMessage}) 
    }
})




app.delete('/api/persons/:id', async (req, res)=>{
  const id = req.params.id
  const person =await  deleteElement(id);
  console.log("resultado del delete",person);
  res.json({message:`It was delete ${person.deletedCount} with id ${id}`});

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