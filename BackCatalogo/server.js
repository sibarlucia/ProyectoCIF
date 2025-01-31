


require('dotenv').config()

//const punycode = require('punycode/');

const https = require('https');

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const fs = require('fs');

app.use(cors({
  // origin: "http://catalogofront.s3-website-us-east-1.amazonaws.com",
  // origin: "http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com",
  // origin: "http://localhost:5173"
  // origin: "*"
  origin: "https://181.85.164.67"
  
}))
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Origin', 'http://catalogofront.s3-website-us-east-1.amazonaws.com');

//     res.setHeader('Access-Control-Allow-Origin', 'http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

const pathCert = '/etc/ssl/certs/selfsigned.pem';
const pathKey = '/home/user/CIF/ProyectoCIF/BackCatalogo/keys/selfsigned.pem'

//const cert = fs.readFileSync('/etc/ssl/certs/selfsigned.pem',)
//const key = fs.readFileSync('/home/user/CIF/ProyectoCIF/BackCatalogo/keys/selfsigned.pem')
const options = {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true ,
  tlsCAFile: fs.readFileSync(pathCert),  // El certificado de la autoridad certificadora
  //tlsCertFile: '/etc/ssl/certs/selfsigned.pem',  // El certificado del cliente
  //tlsKeyFile: '/home/user/CIF/ProyectoCIF/BackCatalogo/selfsigned.key'  // La clave privada del cliente
  //sslCert: sslCert,  // Opción válida en versiones antiguas
  sslKey: fs.readFileSync(pathKey)  // Opción válida en versiones antiguas
}

mongoose.connect(process.env.DATABASE_URL, options)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const librosRouter = require('./routes/routesLibros.js')
app.use('/libros', librosRouter)

const certs = {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true ,

  key: fs.readFileSync(pathKey),
  cert: fs.readFileSync(pathCert),
};


// app.listen(3000, () => console.log('Server Started'))

// https.createServer(options, app).listen(3000, () => {
//  console.log("Servidor HTTPS corriendo en puerto 3000");
// });

app.use((req, res, next) => {
  if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use(express.json());


// app.get('/libros', function (req, res, next) {
 // res.json({ msg: 'CORS habilitado para todos los orígenes!' });
// });

// Iniciar el servidor en el puerto 443
https.createServer(certs, app).listen(3000, () => {
  console.log("Servidor HTTPS corriendo en el puerto 3000");
});


