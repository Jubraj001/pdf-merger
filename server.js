const express = require('express')
const path = require('path')
const multer  = require('multer')
const mergePdfs = require('./merge')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use('/static',express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
    let file1 = path.join(__dirname,req.files[0].path)
    let file2 = path.join(__dirname,req.files[1].path)
    let merge = await mergePdfs(file1,file2);
    res.redirect(`http://localhost:3000/static/${merge}.pdf`)
  })

app.listen(3000)