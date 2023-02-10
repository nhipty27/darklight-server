const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if(authHeader === undefined || authHeader === undefined) {
        next()
        return
    }
    const token = authHeader
    
    try{
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403) //invalid token
                req.idUser = decoded.data
                next()
            }
        )
    }
    catch(err) {
        res.status(400)
    }
}

module.exports = verifyJWT