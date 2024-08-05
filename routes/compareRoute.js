const { compareCtr } = require('../controllers/compareController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()



router.route('/').get(verifyToken, compareCtr)



module.exports = router
