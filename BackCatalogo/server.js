require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const http = require('http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: "http://localhost:8080",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

// Database Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// JSON Middleware
app.use(express.json());

// Routes
app.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Contraseña requerida' });
  }

  try {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (match) {
      const accessToken = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const librosRouter = require('./routes/routesLibros.js');
app.use('/libros', librosRouter);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const HOST = '0.0.0.0';
const PORT = 3001;

// Server Initialization
http.createServer(app).listen(PORT, HOST, () => {
  console.log(`HTTP Server running on host ${HOST} at port ${PORT}`);
});
