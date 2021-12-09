const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())

app.post('/',(req, res) => {
    console.log(req.body)
    res.send(req.body.data)
    //res.status(500).json({message: "Error"})
})


app.listen(5000)

