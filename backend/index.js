const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const dotenv = require('dotenv')

// HTTPS //
const https = require('https')
const fs = require('fs')
// HTTPS //

dotenv.config()

const port = process.env.VUE_APP_PORT

// Set Parses JSON 
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
  next()
})
// enable files upload
app.use(fileUpload({
  createParentPath: true
}))

// enable middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Import passport
require('./configs/passport')
app.use('/mail', require('./routes/mailRoute'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/users'))
app.use('/form', require('./routes/formRoute'))
app.use('/list', require('./routes/datalistRoute'))
app.use('/process', require('./routes/processRoute'))
app.use('/alf', require('./routes/alfrescoRoute'))
app.use('/assignment', require('./routes/assignmentRoute'))
app.use('/file', require('./routes/fileRoute'))

app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode)
  res.json({
    error: {
      status: statusCode,
      message: err.message
    }
  })
})


// Start Server HTTPS
// https.createServer({
//   key: fs.readFileSync(__dirname + '/server.key'),
//   cert: fs.readFileSync(__dirname + '/server.cert')
// }, app)
// .listen(process.env.VUE_APP_BACKEND_PORT, function () {
//   console.log('Example app listening on port 3300! Go to https://amo.thac.or.th:3300/')
// })


// Start Server HTTP
app.listen(port, () => console.log(`Server is running on port ${port}`))