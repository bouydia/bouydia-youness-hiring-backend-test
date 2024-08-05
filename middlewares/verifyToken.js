const jwt = require('jsonwebtoken')

function verifyToken(req,res,next) {
    const authToken= req.headers.authorization
    if (authToken) {
        const token = authToken.split(' ')[1]
        try {
            const decodedPayload = jwt.verify(token, process.env.SECRET)
            req.user = decodedPayload
            next()
        } catch (error) {
            return res.status(401).json ({message: 'invalide token,access denied'})
        }
    } else {
        // 401 Unautorize
        return res.status(401).json({  message: 'no token provided,access denied'})
    }
}



module.exports = {
  verifyToken,
}