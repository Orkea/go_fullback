const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET')
        console.log(decodedToken);
        const userId = decodedToken.userId
        req.auth = {
            userId: userId
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Vous n'etes pas authentifier" })
    }
}