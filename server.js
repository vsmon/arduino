const express = require('express')
const cors = require('cors')
const app = express()



app.use(express.json())
app.use(cors())

let temp = []

app.post('/temperatura', (req, res) => {
    //console.log(req.body)
    const {temperatura} = req.body
    temp.push(temperatura)

    res.json(temp)
})

app.get('/temperatura', (req, res) => {
    return res.json(temp)
})

app.listen(3000, console.log('Executando...'))