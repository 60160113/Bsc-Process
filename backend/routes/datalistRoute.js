const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const datalistController = require('../controllers/datalistController')

router.post('/getOne', auth.required, (req, res, next) => {
  datalistController.getOne(req)
    .then((response) => {
      console.log(response.data)
      if (response.data.data.length > 1) {
        res.send('Result more than one record')
      } else if (response.data.data.length === 1) {
        res.status(200).send(response.data)
      } else {
        res.send('No Data')
      }
    }).catch((error) => {
      res.status(error.status)
    })
})

router.post('/getAll', auth.required, (req, res, next) => {
  datalistController.getAll(req)
    .then((response) => {
      res.status(200).send(response.data)
    }).catch((error) => {
      res.status(error.status)
    })
})

router.post('/get', auth.required, (req, res, next) => {
  datalistController.get(req)
    .then((response) => {
      console.log(response.data)
      res.status(200).send(response.data)
    }).catch((error) => {
      console.log(error)
      res.status(error.status)
    })
})

module.exports = router