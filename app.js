const express = require('express')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const cors=require('cors')
const { errorHandler, notFound } = require('./middlewares/error')



// Init the app
const app = express()

// Connection to DB
connectDB()

//cors
app.use(cors())

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('v1/api/auth', require('./routes/authRoute'))
app.use('v1/api/article', require('./routes/articleRoute'))
app.use('v1/api/user', require('./routes/userRoute'))

// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)

// Running the server
const port = process.env.PORT || 4001
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port} ^_^`)
})

