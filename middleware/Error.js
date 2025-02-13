const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 


  if(error.name == 'ValidationError'){
    return response.status(400).send({ error: 'Validation Error' })
  }

  next(error)
}


export default errorHandler