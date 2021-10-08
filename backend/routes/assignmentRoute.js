const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const assignmentController = require('../controllers/assignmentController')

router.post('/myTasks', auth.required, (req, res, next) => {
  assignmentController.getAssignment(req)
    .then((response) => {
      let allTasks = []
      if (response.data.total > 1) {
        allTasks = response.data
      } else if (response.data.total > 0) {
        allTasks.push(response.data)
      } else {
        allTasks = response.data
      }
      res.send(allTasks)
    }).catch((error) => {
      
    })
})

module.exports = router