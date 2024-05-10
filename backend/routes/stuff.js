/*
Fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application
*/ 
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const stuffController = require('../controllers/stuff')


//Middleware POST (create)
router.post("/", auth, stuffController.createThing)

//Middleware GET (Read)
router.get('/:id', auth, stuffController.getOneThing)

//Middleware PUT (Update) modifier 
router.put("/:id", auth, stuffController.modifyThing)
//Middelware DELETE (Delete)
router.delete('/:id', auth, stuffController.deleteThing);

// Middleware des objets (route comprise)
router.get('/', auth, stuffController.getAllThing)

module.exports = router