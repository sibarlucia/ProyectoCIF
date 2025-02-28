


require('dotenv').config()

//const punycode = require('punycode/');

const https = require('https');
const http = require('http');

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const fs = require('fs');

app.use(cors({
  // origin: "http://catalogofront.s3-website-us-east-1.amazonaws.com",
  // origin: "http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com",
  // origin: "http://localhost:5173"
  origin: "0.0.0.0",
  //origin: "https://181.85.164.67"
  
}))
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Origin', 'http://catalogofront.s3-website-us-east-1.amazonaws.com');

//     res.setHeader('Access-Control-Allow-Origin', 'http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });





mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const librosRouter = require('./routes/routesLibros.js')
app.use('/libros', librosRouter)


const HOST = '0.0.0.0';

//app.listen(3001, HOST, () => console.log('Server Started'))

http.createServer(app).listen(3001, HOST, () => {
  console.log(`Servidor HTTP corriendo en el host ${HOST} en puerto 3001`);
});

//app.use((req, res, next) => {
  //if (!req.secure) {
   //   return res.redirect(`https://${req.headers.host}${req.url}`);
  //}
  //next();
//});




//https.createServer(app).listen(3000, () => {
//  console.log("Servidor HTTPS corriendo en el puerto 3000");
//});


