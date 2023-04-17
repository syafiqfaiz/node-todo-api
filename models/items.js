const client = require('../db')

const Todos = () => {
  // we return nothing, but accept callback as argument
  // so when the request is done, we will run the callback
  const getAll = (query, callback) =>{
    let additionalQuery = '';

    const queryKeys = Object.keys(query)
    additionalQuery = queryKeys.map((key) => `${key}=${query[key]}`).join(' and ')
    if (additionalQuery != '') {
      additionalQuery = 'where ' + additionalQuery;
    }
    client.query(`SELECT * FROM todos ${additionalQuery}`, callback)
  }

  // for other functions, we return the promise function
  const findById = (id) => (
    client.query('SELECT * FROM todos WHERE id= $1',[id])
  )
  
  const createItem = ({item, user_id, user_name}) => (
    client
      .query(
        'INSERT INTO todos(item, completed, user_id, user_name) VALUES($1, $2, $3, $4) RETURNING *',
        [item, false, user_id, user_name]
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
