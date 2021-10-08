const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const userController = require('../controllers/userControllers')
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', auth.optional, (req, res, next) => {
  res.send('respond with a resource')
})

router.get('/checkLoginUser', auth.optional, (req, res, next) => {
  userController.checkLogin(req)
    .then((response) => {
      res.status(response.status).send(response.data)
    }).catch((error) => {
      res.status(error.status)
    })
})

router.post('/alfLogin', auth.required, (req, res, next) => {
  userController.alfLogin(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/checkpass/:email', auth.required, (req, res, next) => {
  userController.checkUser(req)
    .then((response) => {
      const userPassword = response.data.data[0].password
      bcrypt.compare(req.body.password, userPassword)
        .then((response) => {
          if (response === true) {
            res.send({ status: true })
          } else {
            res.send({ status: false })
          }
        })
    })
})

module.exports = router