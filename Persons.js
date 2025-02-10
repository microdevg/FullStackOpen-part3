



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




const createElement = (newElement)=>{

}

const getList = ()=>{
    return persons
}

const getElement = (id)=>{

  return persons.find(person => person.id === id)
}


const deleteElement = (id) => {

  let ret =[]
  const index = persons.findIndex(person => person.id === id);
  if (index !== -1) ret =    persons.splice(index, 1);
  return ret
};


const updateElement = (id,data)=>{

}



export  {
    getList,
    getElement,
    deleteElement
}