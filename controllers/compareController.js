const asyncHandler = require('express-async-handler')
const { Article } = require('../models/Article')
const { crawlPage } = require('../utils/crawler ');
const { findDuplicateParagraphs } = require('../utils/duplicateDetector');

/**-------------------------------
 * @desc compare with data from crawled websites 
 * @route v1/api/compare-with-crawled
 * @method GET
 * @access private (only login user)
 *---------------------------------*/

function transformPagesToArray(pages) {
  return Object.values(pages).flatMap(page => page.content)
}

function findSimilarTexts(articleTexts, pageContents) {
  const similarities = [];

  for (const {_id,text} of articleTexts) {
    for (const pageContent of pageContents) {
      //const combinedContent = `${pageContent}\n${text}`
      //if (findDuplicateParagraphs(combinedContent).length > 0) {
        similarities.push({
          _id,
          text,
          pageContent,
        })
      //}
    }
  }
  return similarities
}
module.exports.compareCtr = asyncHandler(async (req, res) => {
  const baseUrl = 'http://wagslane.dev'
  
  const articles = await Article.find({
    user:req.user.id,
  })

  const pages = await crawlPage(baseUrl, baseUrl, {})
  
  // Transform pages to array
 const pageContents = transformPagesToArray(pages)

  // Find similarities
  const similarities = findSimilarTexts(articles, pageContents)

  // Output results
  /* console.log('Similar texts found:')
  similarities.forEach(sim => {
    console.log(`Article ID: ${sim._id}`)
    console.log(`Article Text: ${sim.text}`)
    console.log(`Page Content: ${sim.pageContent}`)
    console.log('---') 
  })   */
  
  
  //send a response to client
  res.status(201).json({ similarities })
})
