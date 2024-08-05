
const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { validObjectId } = require('../middlewares/validObjectId')
const { checkDuplicate } = require('../middlewares/checkDuplicate')

const {
  createArticleCtr,
  getAllArticlsCtr,
  deleteArticle,
  updateArticle,
} = require('../controllers/articleController')


router.route('/').post(verifyToken,checkDuplicate, createArticleCtr).get(getAllArticlsCtr) 

 router
   .route('/:id')
   .delete(validObjectId, verifyToken, deleteArticle)
   .put(validObjectId, verifyToken, checkDuplicate, updateArticle)

module.exports = router