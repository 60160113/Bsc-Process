const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const formController = require('../controllers/formController')

router.post('/submit', auth.required, (req, res, next) => {
  formController.submit(req)
    .then((response) => {
      res.status(200).send(response.data)
    }).catch((error) => {
      res.send(error)
    })
})

router.post('/delete', auth.required, (req, res, next) => {
  formController.delete(req)
    .then((response) => {
      res.status(200).send(response.data)
    }).catch((error) => {
      res.send(error)
    })
})

module.exports = router