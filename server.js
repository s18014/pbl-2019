const express = require('express')
const app = express()
const portNo = 3000

app.listen(portNo, () => {
  console.log(`server started on http://localhost:${portNo}`)
})

app.use('/', express.static('./public/'))
