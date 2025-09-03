const connectToMongo = require('./db');
const express = require('express')
var cors=require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Available Routes
// app.use('/api/auth', require('./routes/auth.js'))
// app.use('/api/notes', require('./routes/notes.js'))

// Available Routes
const authRoutes=require('./routes/auth.js')
const notesRoutes=require('./routes/notes.js')
app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.get('/harshit',(req,res)=>{
    res.send("Harshit is handsome always")
})

app.listen(port, () => {
    console.log("Server listening")
})
connectToMongo();
