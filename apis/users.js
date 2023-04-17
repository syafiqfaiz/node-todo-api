const express = require('express')
const router = express.Router()
const Users = require('../models/Users')

router.post('/register', async (req, res) => {
  const {email, password, name} = req.body;
  const user = await Users().registerUser(email, password, name)

  res.json({...user, hashed_password: null})
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  
  let user = await Users().findByEmail(email)
  if (!user) { return res.status(404).send()}

  validUserToken = await Users().authenticateUser(user, password) 
  if (!validUserToken){
    res.status(401).send()
  }
  res.json({...user, hashed_password: null, jwt: validUserToken}).send()
})


module.exports = router