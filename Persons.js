
import {Person,mongoose} from "./db.js";





const createElement = ({name,number})=>{

  const newPerson = new Person({
    name,
    number
  })
  return newPerson.save()
}

const getList = ()=>{
    return Person.find({}).then(result=> result)
}

const getElement = (id)=>{
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("ID inválido:", id);
    return console.log("id invalido")
}

  return Person.findOne({ _id: new mongoose.Types.ObjectId(id) }).then(result => result)
}



const getElementByName = (name)=>{


   return  Person.findOne({name:name}).then(result=> result);

  }


const deleteElement = (id) => {

  return   Person.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).then(result =>{
    console.log("result",result, result.deletedCount);
    return result;
  } )

  
};


const updateElement = (id,data)=>{

}



export  {
    getList,
    getElement,
    getElementByName,
    deleteElement,
    createElement
}