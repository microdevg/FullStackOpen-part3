import express from "express"
import cors from "cors"



import morgan from "morgan"


import {  getList, 
          getElement,
          updateElement,
          deleteElement,
          createElement,
          getElementByName,
          checkId} from "./Persons.js"
import errorHandler from "./middleware/Error.js"
import unknownEndpoint from "./middleware/unknownEndpoint.js"


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

app.get('/api/persons', async (req, res) => {
  try {
    const list = await getList();
    res.json(list);
  } catch (error) {
    console.error("Error al obtener la lista de personas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get('/api/persons/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const person = await getElement(id);
    console.log("Person with ID:", id, person);
    
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    next(error)
   
  }
});

app.get('/api/persons/name/:name', async (req, res,next) => {
  try {
    const name = req.params.name;
    const person = await getElementByName(name);
    console.log("Person found:", person);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    next(error)
    console.error("Error in server:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post('/api/persons', async (req, res) => {
  try {
    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({ error: "Error en los datos, name y number son requeridos." });
    }

    const existingPerson = await getElementByName(name);
    if (existingPerson) {
      const updatedPerson = await updateElement(existingPerson._id, { name, number });
      return res.status(409).json(updatedPerson);
    }

    const person = await createElement({ name, number });
    res.status(201).json(person);
  } catch (error) {
    console.error("Error al crear la persona:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!checkId) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const person = await deleteElement(id);

    if (person.deletedCount === 0) {
      return res.status(404).json({ error: "Persona no encontrada." });
    }

    res.json({ message: `Se eliminó correctamente la persona con ID ${id}.` });
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/info", async (req, res) => {
  try {
    const people = await getList();
    const now = new Date();
    const message = `<p>Phonebook tiene información de ${people.length} personas.</p><p>${now}</p>`;
    res.send(message);
  } catch (error) {
    console.error("Error al obtener la información:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});







app.put('/api/persons', async (req, res,next) => {
  try {
    const { name, number, id } = req.body;

    // Validar datos de entrada
    if (!name || !number) {
      return res.status(400).json({ error: "Error en los datos, name y number son requeridos." });
    }

    // Verificar si el ID es válido
    if (!checkId(id)) {
      return res.status(400).json({ error: "Formato de ID inválido." });
    }

    // Verificar si el nombre ya está en uso por otra persona
    const existingPerson = await getElementByName(name);
    if (existingPerson && existingPerson._id.toString() !== id) {
      return res.status(409).json({ error: "Update data" });
    }

    // Actualizar la persona
    const updatedPerson = await updateElement(id, { name, number });

    if (!updatedPerson) {
      return res.status(404).json({ error: "Persona no encontrada." });
    }

    res.json(updatedPerson);
  } catch (error) {
    next(error)
  }
});



app.put('/api/persons/:id', async (req, res,next) => {
  try {
    const { id } = req.params;
    const { name, number } = req.body;

    // Validar datos de entrada
    if (!name || !number) {
      return res.status(400).json({ error: "Error en los datos, name y number son requeridos." });
    }

    // Verificar si el ID es válido
    if (!checkId(id)) {
      return res.status(400).json({ error: "Formato de ID inválido." });
    }

    // Verificar si el nombre ya está en uso por otra persona
    const existingPerson = await getElementByName(name);
    if (existingPerson && existingPerson._id.toString() !== id) {
      return res.status(409).json({ error: "El nombre ya está en uso." });
    }

    // Actualizar la persona
    const updatedPerson = await updateElement(id, { name, number });

    if (!updatedPerson) {
      return res.status(404).json({ error: "Persona no encontrada." });
    }

    res.json(updatedPerson);
  } catch (error) {
    next(error)
  }
});



app.use(unknownEndpoint)


app.use(errorHandler)









const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})