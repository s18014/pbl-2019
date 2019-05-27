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
  res.json(req.body)
})

app.get('/api/getTasks', (req, res) => {
  const dummyData = {
    imagePath: '',
    taskMsg: '変質者がいました',
    locationMsg: '那覇市の平和通り',
    location: {
      lat: 26.214,
      lon: 127.686
    }
  }
  res.json(dummyData)
})
