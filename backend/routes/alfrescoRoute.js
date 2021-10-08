const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const alfrescoController = require('../controllers/alfrescoController')

router.post('/login', auth.required, (req, res, next) => {
  alfrescoController.login()
    .then((response) => {
      res.status(200).send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

module.exports = router