const asyncHandler = require('express-async-handler')
const { Article } = require('../models/Article')


/**-------------------------------
 * @desc compare with data from crawled websites 
 * @route v1/api/compare-with-crawled
 * @method GET
 * @access private (only login users)
 *---------------------------------*/
module.exports.compareCtr = asyncHandler(async (req, res) => {

  //send a response to client
  res.status(201).json({ message: 'Compared Data' })
})
