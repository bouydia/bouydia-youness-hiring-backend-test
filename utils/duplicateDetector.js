const fs = require('fs')
const crypto = require('crypto')

// Function to hash a string using SHA-256
const hashParagraph = paragraph => {
  return crypto.createHash('sha256').update(paragraph).digest('hex')
}

// Function to find duplicate paragraphs
const findDuplicateParagraphs = async (text) => {
  try {
    const paragraphs = text.split('\n') // Assuming paragraphs are separated by  oneline
    const hashMap = new Map()
    const duplicates = []

    paragraphs.forEach((paragraph, index) => {
      const hash = hashParagraph(paragraph.trim())
      if (hashMap.has(hash)) {
        duplicates.push({ paragraph, indexes: [hashMap.get(hash), index] })
      } else {
        hashMap.set(hash, index)
      }
    })

    return duplicates
  } catch (error) {
    console.error('Error:', error)
  }
}
module.exports= {
  findDuplicateParagraphs,
}




  // Use the function with your text file
/* }(async () => {
  try {
    const duplicates = await findDuplicateParagraphs('./content.txt')
    if (duplicates.length > 0) {
      console.log('Duplicate paragraphs found:')
      duplicates.forEach((duplicate, idx) => {
        console.log(`Duplicate ${idx + 1}:`)
        console.log(duplicate.paragraph)
        console.log(`Indexes: ${duplicate.indexes.join(', ')}`)
        console.log('---------------------------------')
      })
    } else {
      console.log('No duplicate paragraphs found.')
    }
  } catch (error) {
    console.error('Error:', error)
  }
})() */
