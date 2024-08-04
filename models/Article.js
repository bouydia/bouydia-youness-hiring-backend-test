const mongoose = require('mongoose')

const Joi = require('joi')
const { Schema } = mongoose

const ArticleSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100000000,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
)

// Article model
const Article = mongoose.model('Article', ArticleSchema)


// Validate create Article
function validateCreateArticle(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  })
  return schema.validate(obj)
}

// Validate update Article
function validateUpdateArticle(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  })
  return schema.validate(obj)
}

module.exports = {
  Article,
  validateCreateArticle,
  validateUpdateArticle,
}
