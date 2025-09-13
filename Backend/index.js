const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const connectToMongo = require('./db');
const express = require('express')
var cors=require('cors')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

// Available Routes
const authRoutes=require('./routes/auth.js')
const notesRoutes=require('./routes/notes.js')
app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)


app.listen(port, () => {
    console.log("Server listening")
})
connectToMongo();
