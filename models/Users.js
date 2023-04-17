const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.JSON_SECRET
const SALT_ROUND = 10

const Users =  () => {

  const saltAndHash = (password) => (
    bcrypt.hash(password, SALT_ROUND).then(hash => hash)
  )

  const generateJWTToken = ({email, id}) => (
    jwt.sign({email, id}, TOKEN_SECRET, { expiresIn: '2 days' })
  )

  const registerUser = async (email, password, name) => {
    const hashedPassword = await saltAndHash(password)

    return db.query('INSERT INTO users(email, hashed_password, name) values($1, $2, $3) RETURNING *', [email, hashedPassword, name])
      .then(res => {
        return res.rows[0]
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const authenticateUser = async (user, password) => {
    return bcrypt.compare(password, user.hashed_password)
      .then((result) => {
        if (result) {
          return generateJWTToken(user)
        }
      })
      .catch(err => {
        console.log(err)
        
        return false
      })
  }

  const findByEmail = (email) =>(
    db.query('SELECT * FROM users WHERE email=$1', [email])
      .then(result => result.rows[0])
      .catch(err => console.log(err))
  )

  const findById = (id) =>(
    db.query('SELECT * FROM users WHERE id=$1', [id])
      .then(result => result.rows[0])
      .catch(err => console.log(err))
  )

  const getAll = () => (
    db.query('SELECT * FROM users')
  )

  return {registerUser, authenticateUser, findByEmail, findById, getAll}
}

module.exports = Users
