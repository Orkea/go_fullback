/*
Fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application
*/ 
const express = require('express')
const router = express.Router()
const stuffController = require('../controllers/stuff')


//Middleware POST (create)
router.post("/", stuffController.createThing)

//Middleware GET (Read)
router.get('/:id', stuffController.getOneThing)

//Middleware PUT (Update) modifier 
router.put("/:id", stuffController.modifyThing)
//Middelware DELETE (Delete)
router.delete('/:id', stuffController.deleteThing);

// Middleware des objets (route comprise)
router.get('/', stuffController.getAllThing)

module.exports = router