const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send({
    statu: "success",
  })
})

app.listen(3000)