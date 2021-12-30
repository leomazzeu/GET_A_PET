const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware to validate token
const checkToken = (req, res, next) => {

  if(!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" })
  } // Verifica se no header possui o authorization
  
  const token = getToken(req)

  if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    const verified = jwt.verify(token, 'meusecret')
    // console.log(verified)
    // req.user = verified
    next()
  } catch (error) {
    return res.status(400).json({ message: "Token inválido!" })
  }

}

module.exports = checkToken