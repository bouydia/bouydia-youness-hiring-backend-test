const mongoose = require('mongoose')

const Joi = require('joi')
const { Schema } = mongoose

const UserSchema = new Schema(
  {

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
   
  },
  {
    timestamp: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// get the articls belong this user
UserSchema.virtual('articles', {
  ref: 'Article',
  foreignField: 'user',
  localField: '_id',
})


const User = mongoose.model('User', UserSchema)

//Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(8).required(),
  })

  return schema.validate(obj)
}

//Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(8).required(),
  })

  return schema.validate(obj)
}


module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
}
