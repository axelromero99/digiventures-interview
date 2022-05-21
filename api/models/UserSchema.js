
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = new mongoose.Schema({
    fullname: String,
    email: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    country: String,
    custom_country: String,
    remember: Boolean
})

// Hashing the password
User.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

// Method for comparing the actual password hash with the database hash
User.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

module.exports = mongoose.model("User", User)