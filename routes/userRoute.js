const express = require('express')
const { getUser } = require('../controllers/userController')

const { validObjectId } = require('../middlewares/validObjectId')
const {
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require('../middlewares/verifyToken')

const router = express.Router()


router
  .route('/:id')
  .get(validObjectId, getUser)


module.exports = router
