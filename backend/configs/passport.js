const { response } = require('express')
const passport = require('passport')
// Test
const passportJWT   = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const userController = require('../controllers/userControllers')
//
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, cb) => {
  // userController.test()
  //   .then((res) => {
  //     console.log(res)
  //   })
    await userController.findUser(email)
      .then((response) => {
        console.log(response)
        bcrypt.compare(password, response.data.data[0].password)
          .then((passwordIsValid) => {
            if (response.data.data[0].email !== email || !passwordIsValid) {
              return cb(null, false, {message: 'Incorrect email or password.'})
            } else {
              const user = {
                id: response.data.data[0].id,
                fullname: response.data.data[0].fullname,
                email: response.data.data[0].email,
                permission: response.data.data[0].permission,
                groupPermission: response.data.data[0].groupPermission,
                department: response.data.data[0].department,
                departmentName: response.data.data[0]['user_department.departmentName'],
                loginat: new Date()
              }
              return cb(null, user, {message: 'Logged In Successfully'}) 
            }
          })
      }).catch(err => cb(err))
  }
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.VUE_APP_SECRET
}, (jwtPayload, cb) => {
  try {
    // find the user in db if needed
    if(jwtPayload.id == user.id) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  } catch (error) {
    return cb(error, false);
  }
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.  
//   return UserModel.findOneById(jwtPayload.id)
//     .then(user => {
//       return cb(null, user)
//     }).catch(err => {
//       return cb(err)
//     })
//   }
}
))