const router = require('express').Router()
const fileController = require('../controllers/fileController')
const fs = require('fs')

router.get('/:json', (req, res, next) => {
  const reqFile = req.params.json
  fs.readFile(`configs/json/${reqFile}.json`, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    } else {
      res.json(JSON.parse(jsonString))
    }
  })
})

router.post('/:json', (req, res, next) => {
  const reqFile = req.params.json
  const jsonObj = req.body
  let dataObj = []

  fs.readFile(`configs/json/${reqFile}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
    //   console.log(JSON.parse(data))
      dataObj = JSON.parse(data);

    // add a new record
      dataObj.push(jsonObj)
      console.log(JSON.stringify(dataObj))
    }
  })

  fs.writeFile(`configs/json/${reqFile}.json`, JSON.stringify(dataObj), err => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      res.json({ statusText: 'Success' })
    }
  })
})

module.exports = router