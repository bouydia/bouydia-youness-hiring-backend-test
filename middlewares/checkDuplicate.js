//check duplicate praghraphs within the same content or exisitng content

const { Article } = require('../models/Article')
const { findDuplicateParagraphs } = require('../utils/duplicateDetector')

const checkDuplicate = async ( req, res, next) => {
    try {
      if (req.body.text === '')
        return res.status(400).json({ message: 'No text are provided' })

      const previousArticles = await Article.find()

      const internalDuplicates = await findDuplicateParagraphs(req.body.text)
      if (internalDuplicates.length > 0) {
        return res
          .status(400)
          .json({
            message: 'You have duplicated paragraphs within your article',
          })
      }

      // Check for duplicates paragraphs with previous articles
      const allPreviousText = previousArticles.map(art => art.text).join('\n')
      const externalDuplicates = await findDuplicateParagraphs(
        req.body.text + '\n' + allPreviousText
      )
      if (externalDuplicates.length > internalDuplicates.length) {
        return res.status(400).json({
          message:
            'Your article contains paragraphs that are in other  existing articles',
        })
      }
    next()
  } catch (error) {
    next(error)
  }

}

module.exports = {
  checkDuplicate,
}
