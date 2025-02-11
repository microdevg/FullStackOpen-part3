import  mongoose  from 'mongoose'

import { username,pass } from './credentials.js';





//How many parameters did you receive?

const obj = processParams();





if(obj != undefined){
    console.log(`Action ${obj.action}`);
    connectDB(obj.pass);



    const phoneSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, // Hace que el campo sea obligatorio
            trim: true // Elimina espacios en blanco al inicio y al final
        },
        number: {
            type: String,
            required: true,
            match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Formato de número no válido']
        }
    })
  
  const Phone = mongoose.model('Phone', phoneSchema)

    switch(obj.action){


        case "list":
            Phone.find({}).then(result => {
                console.log("phonebook:")
                result.forEach(phone => {
                console.log(` ${phone.name} ${phone.number}`)
                })
                mongoose.connection.close()
            })
            break;


        case "add":
        const phone = new Phone({
            name: obj.name,
            number: obj.phone,
          })
          
          phone.save().then(result => {
            mongoose.connection.close()
          })

        break;

    }

}















  function  processParams(){



    const params = process.argv.length - 2;
    const list = process.argv;
    
    
    if( params == 0) {
        console.log("You need a password to connect to the database");
        
        return undefined
    }
    
    console.log(`params `,list, params)


    let retObject = {};
    
    if( params == 1){
        //list varibles
        retObject.action  = "list"
        retObject.pass = process.argv[2];
    }
    else{
        //add a new phone number
         retObject.action = "add"
         retObject.name = process.argv[3];
         retObject.phone = process.argv[4];
         console.log(`added ${retObject.name} number ${retObject.phone} to phonebook`);
    }
    return retObject;
  }





  function connectDB(password){
    const uri = `mongodb+srv://gvelardez:${pass}@fullstackopen.ygpw3.mongodb.net/?retryWrites=true&w=majority&appName=Fullstackopen`;
    mongoose.set('strictQuery',false)

    mongoose.connect(uri)

  }