const jwt=require('jsonwebtoken')

module.exports.generateToken = async (id) => {
    const token = jwt.sign(
        {
            id,
        },
        process.env.SECRET
    )
    return token
}
