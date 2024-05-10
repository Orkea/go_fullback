const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.signUp =(req, res, next) => {
    //Création du mots de pass avec algorithme *10 . Fonction async
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() =>{

            console.log(" Utilisateur créé")
          return  res.status(201).json({message: "Utilisateur créé ! "})
        } )
            
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}


exports.logIn = (req, res, next) =>{
    // utilisation de la methode FindOne poour trouver l'utilisateur + gestion de la promesse (then+catch)
    User.findOne({email: req.body.email})
    .then(user =>{
        //Verification de l'existance de l'utilisateur dans le DB
        if(!user){
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'})
        }else{
            // Si l'utilisteur existe on compare le mode de pass
            bcrypt.compare(req.body.password, user.password)
            // Gestion de la prommese retournée
            .then(valid =>{
                // si le mot de pass n'est pas valid on retourne un message
                if (! valid){
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
                } else{
                    // si le mode de passe est valide on retourne un mesage et les données de l'utilisateur
                    res.status(200).json({
                        userId: user._id,
                        token : jwt.sign(
                            { userId : user._id},
                            "RAMDOM_TOKEN_SECRET",
                            { expiresIn : "24h"}
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({error}))

        }

    })
    .catch(error => res.status(500).json({error}))


}