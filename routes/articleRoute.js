
const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { validObjectId } = require('../middlewares/validObjectId')

const {
  createArticleCtr,
  getAllArticlsCtr,
} = require('../controllers/articleController')

router.route('/').post(verifyToken, createArticleCtr).get(getAllArticlsCtr) 

/* router
  .route('/:id')
  .get(validObjectId, getSinglePost)
  .delete(validObjectId, verifyToken, deletePost)
  .put(validObjectId, verifyToken, updatePost) */

module.exports = router