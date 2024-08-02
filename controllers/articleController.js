const asyncHandler = require('express-async-handler')
const {
  Article,
  validateCreateArticle,
  validateUpdateArticle,
} = require('../models/Article')



/**-------------------------------
 * @desc   Create New Article
 * @route  /api/Article/ 
 * @method POST
 * @access private (only login user)
 *---------------------------------*/
module.exports.createArticleCtr = asyncHandler(async (req, res) => {

  // validation for data
  const { error } = validateCreateArticle(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  
  // create new Article and save it
  const article = await Article.create({
    text: req.body.text,
    user: req.user.id,
  })
  

  // send messgae to the client
  return res.status(201).json({ article })
})


/**-------------------------------
 * @desc   get all Article
 * @route  /api/Article/ 
 * @method GET
 * @access public 
 *---------------------------------*/
module.exports.getAllArticlsCtr = asyncHandler(async (req, res) => {
  
  const articls = await Article.find()
    .sort({ createdAt: -1 })

  res.status(200).json(articls)

})