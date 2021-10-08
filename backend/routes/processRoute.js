const router = require('express').Router()
const { required } = require('../configs/auth')
const auth = require('../configs/auth')
const processController = require('../controllers/processController')

router.post('/start', auth.required, (req, res, next) => {
  processController.startProcess(req)
    .then((response) => {
      res.status(200).send(response.data)
    }).catch((error) => {
      res.send(error)
    })
})

router.post('/view', auth.required, async (req, res, next) => {
  processController.viewProcess(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/complete', auth.required, async (req, res, next) => {
  processController.completeNoParam(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/completeWithVariable', auth.required, async (req, res, next) => {
  processController.completeWithParams(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/completeProcess', auth.required, async (req, res, next) => {
  await processController.viewProcess(req)
    .then(async (response) => {
      const app = {
        activityId: response.data.activityId,
        payload: req.payload
      }
      await processController.completedProcess(app)
        .then((response) => {
          res.send(response.data)
        }).catch((error) => {
          res.send(error)
        })
      
    }).catch((error) => {
      res.send(error)
    })
})

router.post('/setVariable', auth.required, async (req, res, next) => {
  processController.setVar(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/viewVariable', auth.required, async (req, res, next) => {
  processController.viewProcessVariable(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/history', auth.required, async (req, res, next) => {
  processController.viewHistory(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/assign', auth.required, async (req, res, next) => {
  processController.taskReAssign(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

router.post('/abort', auth.required, async (req, res, next) => {
  processController.abortProcess(req)
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
})

module.exports = router