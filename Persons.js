


import {Person,mongoose} from './db.js'



const createElement = ({ name, number }) => {
  const newPerson = new Person({ name, number })
  return newPerson.save()
}

const getList = () => {
  return Person.find({})
}

const getElement = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('malformatted id')
    error.name = 'CastError'  // Asegurar que el nombre coincide con el esperado en el middleware
    throw error
  }
  return Person.findOne({ _id: new mongoose.Types.ObjectId(id) })
}

const getElementByName = (name) => {
  return Person.findOne({ name })
}

const deleteElement = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('malformatted id')
    error.name = 'CastError'  // Asegurar que el nombre coincide con el esperado en el middleware
    throw error
  }
  return Person.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
}

const updateElement = (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('malformatted id')
    error.name = 'CastError'  // Asegurar que el nombre coincide con el esperado en el middleware
    throw error
  }
  return Person.findByIdAndUpdate(id, data, { new: true })
}



const checkId = (id)=>{
  return mongoose.Types.ObjectId.isValid(id)
}


export {
  getList,
  getElement,
  getElementByName,
  deleteElement,
  createElement,
  updateElement,
  checkId
}
