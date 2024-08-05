const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')



/**-------------------------------
 * @desc get user profile
 * @route v1/api/users/:id
 * @method GET
 * @access public
 *---------------------------------*/
module.exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
    .select('-password')
    .populate('articles')
  if (!user) {
    res.status(404).json({ message: 'user not found' })
  }
  res.status(200).json({ user: user })
})
