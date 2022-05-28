const { addCommentToPost } = require('logic')
const { errors: { FormatError, AuthError, NotFoundError } } = require('commons')
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        const { params: {postId}, body: { text } } = req

        addCommentToPost(userId, postId, text)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 401

                res.status(status).json({ error: error.message })
            })

    } catch (error) {
        let status = 500

        if (error instanceof AuthError)
            status = 401

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}
