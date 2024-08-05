const asyncHandler = require('express-async-handler')
const { Article } = require('../models/Article')
const { crawlPage } = require('../utils/crawler ')


/**-------------------------------
 * @desc compare with data from crawled websites 
 * @route v1/api/compare-with-crawled
 * @method GET
 * @access private (only login users)
 *---------------------------------*/
function transformPagesToArray(pages) {
  return Object.values(pages).flatMap(page => page.content)
}
function findSimilarTexts(articleTexts, pageContents) {
  const similarities = [];

  for (const [articleId, articleText] of articleTexts) {
    for (const pageContent of pageContents) {
      // Simple similarity check: if one text includes the other
      if (articleText.includes(pageContent) || pageContent.includes(articleText)) {
        similarities.push({
          articleId,
          articleText,
          pageContent
        });
      }
    }
  }
  return similarities
}
module.exports.compareCtr = asyncHandler(async (req, res) => {
  const baseUrl = 'http://wagslane.dev'
  // Assuming you have already fetched the articles
  const articles = await Article.find()
  // Create a Map of article texts
  const articleTextMap = new Map()
  articles.forEach(article => {
    articleTextMap.set(article._id.toString(), article.text)
  })
  
  const pages = await crawlPage(baseUrl, baseUrl, {})
  // Transform pages to array
  const pageContents = transformPagesToArray(pages)

  // Find similarities
   const similarities = findSimilarTexts(articleTextMap, pageContents)

  // Output results
  console.log('Similar texts found:')
  similarities.forEach(sim => {
    console.log(`Article ID: ${sim.articleId}`)
    console.log(`Article Text: ${sim.articleText}`)
    console.log(`Page Content: ${sim.pageContent}`)
    console.log('---') 
  })  
  //send a response to client
  res.status(201).json({ similarities })
})
