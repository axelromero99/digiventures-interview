const connection = require('../db/mongodbConnection');
const User = require('../models/UserSchema');
const bcrypt = require("bcryptjs")

class UserService {

    /**
     * It checks if a user is registered by checking if the username or email is already in the
     * database.
     * @param username - String
     * @param email - String,
     * @returns A boolean value.
     */
    async checkIsRegistered(username, email) {
        try {
            await connection();
            const findUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (findUser) {
                return true;
            } else {
                return false
            }

        } catch (error) {
            return false;
        }
    }

    /**
     * It creates a new user in the database.
     * @param user - {
     * @returns The newUser object is being returned.
     */
    async createUser(user) {
        try {
            await connection();
            const newUser = await User.create(user);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    /**
     * It takes a username, password, and callback function as parameters, and then it tries to find a
     * user with the given username, and if it finds one, it compares the password with the one in the
     * database, and if they match, it returns the user object with the password field set to
     * undefined.
     * @param username - The username of the user
     * @param password - the password that the user entered
     * @param callback - This is the callback function that will be called when the user is found or
     * not found.
     */
    async getUser(username, password, callback) {

        try {
            await connection();

            const findUser = await User.findOne({ username: username }).exec(function (error, user) {
                if (error) {
                    callback({
                        error: true,
                        message: "Incorrect username or password"
                    })
                } else if (!user) {
                    callback({
                        error: true,
                        message: "Incorrect username or password"
                    })
                } else {
                    user.comparePassword(password, function (matchError, isMatch) {
                        if (matchError) {
                            callback({
                                error: true,
                                message: 'Incorrect password'
                            })
                        } else if (!isMatch) {
                            callback({
                                error: true,
                                message: 'Incorrect password'
                            })
                        } else {
                            user.password = undefined
                            callback({
                                success: true,
                                error: false,
                                user: user,
                                message: "Successful login",
                            })
                        }
                    })
                }
            })

        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserService;
