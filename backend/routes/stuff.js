/*
Fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application
*/ 
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require("../middleware/multer-config")
const stuffController = require('../controllers/stuff')


//Middleware POST (create)
router.post("/", auth, multer, stuffController.createThing)

//Middleware GET (Read)
router.get('/:id', auth, stuffController.getOneThing)

//Middleware PUT (Update) modifier 
router.put("/:id", auth, multer, stuffController.modifyThing)
//Middelware DELETE (Delete)
router.delete('/:id', auth, stuffController.deleteThing);

// Middleware des objets (route comprise)
router.get('/', auth, stuffController.getAllThing)

module.exports = router