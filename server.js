const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')

const app = express()
const tmpDir = path.join(__dirname, 'tmp')
const upload = multer({ dest: tmpDir })
const portNo = 3000

app.listen(portNo, () => {
  console.log(`server started on http://localhost:${portNo}`)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static('./public/'))

app.post('/api/upload', upload.any(), (req, res) => {
  console.log(req.files)
  console.log(req.body)
  res.json({ status: true })
})
