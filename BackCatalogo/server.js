


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

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true ,
  sslCA: `-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIUEcneK2nPw5vwEXpKcxX87Ev/MHYwDQYJKoZIhvcNAQEL
BQAwGjEYMBYGA1UEAwwPPDE4MS44NS4xNjQuNjc+MB4XDTI1MDEzMTA0MzQ1M1oX
DTI2MDEzMTA0MzQ1M1owGjEYMBYGA1UEAwwPPDE4MS44NS4xNjQuNjc+MIICIjAN
BgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAt2r//otbkwaXrmws0wbPdeVRt4Hw
HclJ1+VodgkY01kPHbOzUGk/g53JXvH4ImurrJyfqzmSYj8OAdRoSxNZkE02Zk5F
RE8Qsh9QwdUXY31CDVi99QHDncf68jWbLr1agLoad1qkL6o1hp16qt30qRHnZQlX
KK8+H4K6HTS8Z7lQndTTWwOT0d+bc7FQa3G5/VdqGnJTePh7cln1eFkh8WqsORfT
IUCSKwoFviDtPlBSzccGDbv+M38mFW8jE4WP3BM5w129Op+Y/ehVuIUuEWv4gRXa
Xh6f8C2ckn7gyWkBd7ydoDWQ+DBuTCVVn/lPxN1h4fqe0bO4/QhkLpPMjavMqsDD
DYwFMcHl9d+v4mbDInLjqvPYOWOrouaEu7uZMGF3Dx024g9kG+6OE7rmYs11MEfz
g2NCiuxmg/Xrftp1jIp5vzaBvpNeOhdL6MY+IvJdU6O+R2PgRXKO6mLFrvvpLrBp
kW6DCn0o+IlZljR4AwXS+h7uHhUwMvXTfKUtI2akpMLiCL9mPS0mhhckTYIrGGx2
bRWfToFKITn5HhPX0hW6yj7x9oW4+D8dxZhYpFci5a5WeVIM1DP+qdcJebIiXKyv
yeoYeemKnMRLUPG+A4NJGQsRGmq2bRJd4jXWVBbNaZIN5BDPAHVOHPlKHRUoIFwq
JL/1DW+LAmwf3jECAwEAAaNTMFEwHQYDVR0OBBYEFMF2Gf1nIZFt/k/4w1x4h9Ax
Lh5rMB8GA1UdIwQYMBaAFMF2Gf1nIZFt/k/4w1x4h9AxLh5rMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADggIBAG0gh5ODh4Co5GFVfiv+Zw4LTvchE04R
XkE+v3PrH6uZS8yp1ir2XsQ0KIEZxIn7f1jgz5SBlmxFD/Qln15idtD+HV5MC4mH
AdRL2T3VU3crEkYAQbqy52TjtJKmW/X73w/kMLGeo0bIGNkdG9mfTdOSxr3Nmfi4
qsZcLKVQUATWYChp5Src59fNamf5mlNkXa6wPALdu1caOOKRE8/f+nUqBGY2leh6
U05WsNwINJUeKnpSGunYeIoLWrBO1Zbhp0Mf115MMfej6PUxIKe6llBCrgVxOJP8
VeJe/F5EmVQctZ6LgsYnsdDqUd95j/mys7IXdZ+ALJJbW2wwRzn2BThyidlTmUmh
N/VT+AH2pBUdm8/RwWhp/u5yy5fvOdhzZ271PIHw61B0OPIV8tgiw8E3ukYSI80U
Ov9q1IHUyEoNBNiegrcLqwS1O23RshExQSLuxAKDbp1uipsNtUeDJvK0TSIWaxB2
cA+N9uEy8D8XyuM8J2iMM/10GJ9+g6bjC7eUJqpLRGE539S/UxWlFBXqI7vGz9j3
3n37Oo7pI5IY6SMS/4Kz97slcLpPlA7nEDiZy7fWaC135W93kWq2c4p+gZVMOEad
VF7hqNU74tCexmo7c1dIlGVk97VkbsOHE5tuEQLqwk97zBLSpcD1T5eIa1EjCno1
wfL6yFHIBCWg
-----END CERTIFICATE-----`,  // El certificado de la autoridad certificadora
  //tlsCertFile: '/etc/ssl/certs/selfsigned.pem',  // El certificado del cliente
  //tlsKeyFile: '/home/user/CIF/ProyectoCIF/BackCatalogo/selfsigned.key'  // La clave privada del cliente
  sslCert: fs.readFileSync('/etc/ssl/certs/selfsigned.pem'),  // Opción válida en versiones antiguas
  sslKey: fs.readFileSync('/home/user/CIF/ProyectoCIF/BackCatalogo/selfsigned.pem')  // Opción válida en versiones antiguas
}

mongoose.connect(process.env.DATABASE_URL, options)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const librosRouter = require('./routes/routesLibros.js')
app.use('/libros', librosRouter)

const certs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true ,

  key: fs.readFileSync('/home/user/CIF/ProyectoCIF/BackCatalogo/selfsigned.pem'),
  cert: fs.readFileSync('/etc/ssl/certs/selfsigned.pem')
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


