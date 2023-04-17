const express = require('express')
const router = express.Router()
const Todos = require('../models/items')
const User = require('../models/Users')
const {checkToken} = require('../middlewares')

router.get('/', (req, res) => {
  // using callback
  Todos().getAll(req.query, (err, result)=> {
    if (err) {
      console.log('error', err);
      return
    }
    const sorted = result.rows.sort((a, b)=>{return a.id - b.id})

    res.json(sorted)
  })
  
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = Todos().findById(id)
  item.then( result => {
    res.json(result.rows[0])
    return
  }).catch( err => (
    res.status(404).send()
  ))
})

// async/await
router.post('/', checkToken, async (req, res) => {
  const body = req.body
  try {
    const user = await User().findById(req.curretUserId)
    const result = await Todos().createItem({
      ...body,
      user_name: user.name,
      user_id: user.id
    })

    res.json(result.rows[0])
  } catch (error) {
    console.log(error);

    res.status(400).send()
  }
})

// async/await
router.put('/:id', checkToken, async (req, res) => {
  const body = req.body;
  const id = req.params.id

  try {
    const {rows} = await Todos().findById(id)
    const result = await Todos().updateItem(id, {...rows[0], ...body})

    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// promise
router.delete('/:id', checkToken, async(req, res) => {
  const id = req.params.id

  Todos().deleteItem(id)
    .then( _result => {
      res.status(204).send()
    })
    .catch ( err => {
      console.log(error);

      res.status(400).send(error)
    })

  
})

module.exports = router;
