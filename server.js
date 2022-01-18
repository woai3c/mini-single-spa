const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(express.static('dist'))

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'dist') })
})

app.listen(3000, () => {
    console.log('server listen on port 3000...')
})