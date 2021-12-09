const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/',(req, res) => {
    console.log('here')
    res.send('HEllo World')
    //res.status(500).json({message: "Error"})
})


app.listen(5000)

