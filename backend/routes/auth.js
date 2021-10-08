const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')

/* POST login. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) console.log(err)
    // return next(err)
    
    if (user) {
      const token = jwt.sign(user, process.env.VUE_APP_SECRET)
      return res.json({user, token})
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})

module.exports = router