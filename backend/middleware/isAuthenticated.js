const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized token not found' })
        }  
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }
        req.id = decodedToken.userId;
        console.log("Token are the varify", decodedToken)
        console.log(token)
        next()
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = isAuthenticated;