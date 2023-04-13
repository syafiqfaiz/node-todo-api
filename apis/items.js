const express = require('express')
const router = express.Router()
const Todos = require('../models/items')
const {checkToken} = require('../middlewares')

router.get('/', (req, res) => {
  // using callback
  Todos().getAll((err, result)=> {
    if (err) {
      console.log('error', err);
      return
    }
    res.json(result.rows)
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
    const result = await Todos().createItem(body)

    res.json(result.rows[0])
  } catch (error) {
    console.log(error);

    res.status(400).send()
  }
})

// promise
router.put('/:id', checkToken, (req, res) => {
  const body = req.body;
  const id = req.params.id

  Todos().updateItem(id, body)
    .then( result => res.json(result.rows[0]))
    .catch( err => console.log(err))
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
