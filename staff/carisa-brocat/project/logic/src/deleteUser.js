const { models: { User } } = require('data')
const { errors: {
    AuthError,
    ClientError,
    NotFoundError
},
    validators: {
        validatePassword,
        validateId,
    }
} = require('commons')
const { comparePassword } = require('./helpers/crypt')

function deleteUser(userId, password) {
    validateId(userId, 'userId')
    validatePassword(password)

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return comparePassword(password, user.password)
                .then((isSamePassword) => {
                    if (!isSamePassword) {
                        throw new AuthError('Invalid Credentials')
                    }

                    return User.deleteOne({ _id: userId })
                        .then(result => { })
                        .catch(error => {
                            throw new ClientError(error.message)
                        })
                })
        })
}

module.exports = deleteUser