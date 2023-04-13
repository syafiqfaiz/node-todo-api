require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {attachRequestTime, myLogger} = require('./middlewares');
const apiRouter = require('./apis')

const PORT = process.env.PORT;

app.use(attachRequestTime)
app.use(myLogger)
app.use(bodyParser.json())

app.get('/', (req, res)=>{
  res.send('hello world')
})
app.get('/about', (req, res)=>{
  res.send('about')
})

app.get('/shop', (req, res)=>{
  res.send('shop')
})

app.use('/api', apiRouter)


app.listen(PORT, ()=>{
  console.log(`app listening on port ${PORT}`);
})