const mongoose = require('mongoose')
const express = require('express')
// Importation du routeur
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const path = require("path")

const app = express()

mongoose.connect('mongodb+srv://mymy:VXBqdrIWX6f87doJ@orkeacluster1.ha2oryp.mongodb.net/?retryWrites=true&w=majority&appName=OrkeaCluster1',
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Express prend toutes les requêtes qui ont comme Content-Type : application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json())


// Middleware autorisant l'acces CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, "images")))

module.exports = app