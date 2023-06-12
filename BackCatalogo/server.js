


require('dotenv').config()



const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors({
  origin: "http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com/"
}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const librosRouter = require('./routes/routesLibros.js')
app.use('/libros', librosRouter)

app.listen(3000, () => console.log('Server Started'))

