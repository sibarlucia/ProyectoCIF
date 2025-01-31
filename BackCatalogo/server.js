


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

const pathCert = '/etc/ssl/certs/selfsigned.crt';
const pathKey = '/home/user/CIF/ProyectoCIF/BackCatalogo/keys/selfsigned.key'

//const cert = fs.readFileSync('/etc/ssl/certs/selfsigned.pem',)
//const key = fs.readFileSync('/home/user/CIF/ProyectoCIF/BackCatalogo/keys/selfsigned.pem')
const options = {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true ,
  //tlsCAFile: (pathCert,'utf8'),  // El certificado de la autoridad certificadora
  //tlsCertFile: '/etc/ssl/certs/selfsigned.pem',  // El certificado del cliente
  //tlsKeyFile: '/home/user/CIF/ProyectoCIF/BackCatalogo/selfsigned.key'  // La clave privada del cliente
  sslCert:`-----BEGIN CERTIFICATE-----
  MIIFFTCCAv2gAwIBAgIUEcneK2nPw5vwEXpKcxX87Ev/MHYwDQYJKoZIhvcNAQEL
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
  -----END CERTIFICATE-----` ,

  sslKey:`-----BEGIN PRIVATE KEY-----
  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
  wkuMa/HVlChMrv3cvoJrytjW855oJQ==
  -----END PRIVATE KEY-----` ,
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

  key:`-----BEGIN PRIVATE KEY-----
  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
  wkuMa/HVlChMrv3cvoJrytjW855oJQ==
  -----END PRIVATE KEY-----` ,
  cert: `-----BEGIN CERTIFICATE-----
  MIIFFTCCAv2gAwIBAgIUEcneK2nPw5vwEXpKcxX87Ev/MHYwDQYJKoZIhvcNAQEL
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
  -----END CERTIFICATE-----`,
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


