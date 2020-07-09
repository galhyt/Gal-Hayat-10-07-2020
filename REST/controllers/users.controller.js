const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const { getTokenFromHeaders, getUserFromToken } = userService;


// routes
router.post('/authenticateUser', authenticateUser);
router.post('/registerNewUser', registerNewUser);

module.exports = router;

function authenticateUser(req, res, next) {
    userService.authenticateUser(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerNewUser(req, res, next) {
    userService.registerNewUser(req)
        .then(user => res.json(user))
        .catch(next);
}
