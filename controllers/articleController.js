const asyncHandler = require('express-async-handler')
const {
  Article,
  validateCreateArticle,
  validateUpdateArticle,
} = require('../models/Article')
const { findDuplicateParagraphs } = require('../utils/duplicateDetector')

/**-------------------------------
 * @desc   Create New Article
 * @route  /api/Article/
 * @method POST
 * @access private (only login user)
 *---------------------------------*/
module.exports.createArticleCtr = asyncHandler(async (req, res) => {
  let article

  // validation for data
  const { error } = validateCreateArticle(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  /* const previousArticles = await Article.find()

  // Check for duplicates paragraphs within the new article
  const internalDuplicates = await findDuplicateParagraphs(req.body.text)
  if (internalDuplicates.length > 0) {
    return res
      .status(400)
      .json({ message: 'You have duplicated paragraphs within your article' })
  }

  // Check for duplicates paragraphs with previous articles
  const allPreviousText = previousArticles.map(art => art.text).join('\n')
  const externalDuplicates = await findDuplicateParagraphs(
    req.body.text + '\n' + allPreviousText
  )
  if (externalDuplicates.length > internalDuplicates.length) {
    return res.status(400).json({
      message:
        'Your article contains paragraphs that are duplicates of existing articles',
    })
  }
 */
  // create new Article and save it
  article = await Article.create({
    text: req.body.text,
    user: req.user.id,
  })
  // send messgae to the client
  return res.status(201).json({ article })
})

/**-------------------------------
 * @desc   get all Articles
 * @route  /api/Article/
 * @method GET
 * @access public
 *---------------------------------*/
module.exports.getAllArticlsCtr = asyncHandler(async (req, res) => {
  const articls = await Article.find().sort({ createdAt: -1 })

  res.status(200).json(articls)
})


/**-------------------------------
 * @desc   Delete Article
 * @route  /api/article/:id
 * @method delete
 * @access private (only login user )
 *---------------------------------*/
module.exports.deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    res.status(404).json({ message: 'article not found' })
  }
  if (req.user.id === article.user.toString()) {
    await Article.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: 'article has been deleted successfully',
      ArticleId: req.params.id,
    })
  } else {
    res.status(403).json({ message: 'access denied , forbidden' })
  }
})

/**-------------------------------
 * @desc   update Article
 * @route  /api/article/:id
 * @method PUT
 * @access private(only owner)
 *---------------------------------*/
module.exports.updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params.id
  // validate
  const { error } = validateUpdateArticle(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  // get the Article from db and check if exist
  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.status(404).json({ message: 'article not found' })
  }

  // check if Article belong to logged in user
  if (req.user.id != article.user.toString()) {
    return res
      .status(403)
      .json({ message: 'access denied you are not allowed' })
  }
  
  //check duplicate

  // Check for duplicates paragraphs within the new article
  
  //
  // update Article
  const updatedArticle = await Article.findOneAndUpdate(
    id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  ).populate('user', ['-password'])

  // send response to the client
  res
    .status(200)
    .json({ message: 'Article has been updated successfully', updatedArticle })
})