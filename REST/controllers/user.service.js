const config = require('config.json');
const jwt = require('jsonwebtoken');
const DbRepository = require('./DL/repository')

// users hardcoded for simplicity, store in a db for production applications
//const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticateUser,
    registerNewUser,
    getTokenFromHeaders,
    getUserFromToken
};

const dbRep = new DbRepository()

async function authenticateUser({ username, password }) {
    const user = await dbRep.authenticateUser(username, password)
    if (!user) return null// throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function registerNewUser(req) {
    const loggedUserDetails = getUserFromToken(getTokenFromHeaders(req))
    if (loggedUserDetails.sub != null) {
        const loggedUser = await dbRep.getUser(loggedUserDetails.sub)
        if (loggedUser == null || !loggedUser.admin)
            throw new Error('You don\'t have the Admin privilege to continue!')
    }
    else
        throw new Error('You should log in first!')

    const user = req.body /*UserEntity*/
    return await dbRep.registerNewUser(user)
}

function getTokenFromHeaders(req) {
    return req.headers.authorization.replace(/^[^\s]*\s/, '')
}

function getUserFromToken(token) {
    return jwt.verify(token, config.secret)
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}