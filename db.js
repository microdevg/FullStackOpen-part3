
import mongoose from "mongoose";


mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })





const personSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, 
            trim: true 
        },
        number: {
            type: String,
            required: true,
            match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Formato de número no válido']
        }
    })



const Person =   mongoose.model('Person', personSchema)


export default Person;