const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const helmet = require("helmet");

// Import route
const userRoutes = require('./routes/users')
const serviceRoutes = require('./routes/DocumentsPersonnel')

// config app
require('dotenv').config()
const app = express()

// connection to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to database'))
.catch(() => console.log('database is not connected'))

// middllwares
app.use(express.json())
app.use(expressValidator())

// secret your app
app.use(helmet());

// routes middllwares
app.use('/api/user', userRoutes)
app.use('/api/documentsPersonnel', serviceRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is now listening at port ${port}`))
