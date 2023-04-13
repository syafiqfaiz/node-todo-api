const client = require('../db')

const Todos = () => {
  // we return nothing, but accept callback as argument
  // so when the request is done, we will run the callback
  const getAll = (callback) =>{
    client.query('SELECT * FROM todos', callback)
  }

  // for other functions, we return the promise function
  const findById = (id) => (
    client.query('SELECT * FROM todos WHERE id= $1',[id])
  )
  
  const createItem = ({item}) => (
    client
      .query(
        'INSERT INTO todos(item, completed) VALUES($1, $2) RETURNING *',
        [item, false]
      )
  )

  const updateItem = (id, {item, completed}) => (
    client
      .query(
        'UPDATE todos set item=$1, completed=$2 WHERE id = $3 RETURNING *',
        [item, completed, id]
      )
  )

  const deleteItem = (id) => (
    client.query('DELETE FROM todos WHERE id = $1', [id])
  )

  return {
    getAll,
    findById,
    updateItem,
    createItem,
    deleteItem
  }
}

module.exports = Todos
