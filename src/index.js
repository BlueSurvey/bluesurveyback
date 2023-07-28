const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();

const authRoutes = require('./routes/auth.routes')

app.listen(port, () => console.log('Servidor ejecutandose en el puerto ', port))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error))

app.use(cors());
app.use(express.json());
app.use(authRoutes)

