const express = require('express')
const connectdb = require('./Config/connection')
const errorHandler = require('./Middleware/errorhandling')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const app = express()



//middleware
app.use(express.json())
app.use(morgan('tiny'))


//database conncetion
connectdb()

//error handling
app.use(errorHandler)

app.use('/api/product', require('./Routes/productRoutes'))
app.use('/api/category', require('./Routes/categoryRoutes'))
app.use('/api/user', require('./Routes/userRoutes'))



const PORT = process.env.PORT || 6002

//listen for port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})