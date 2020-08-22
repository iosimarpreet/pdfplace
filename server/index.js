const express = require('express')
const uploadS3 = require('./uploadS3')

const app = express()
const port = 4000


app.get('/', (req, res) => {
    uploadS3.upload(fileName='hand_out_6.pdf')
        .then((d) => {
            res.send(d)
        })
        .catch((e) => {
            res.send(e)
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})