const express = require('express');
const router = express.Router();
const TasksBL = require('./BL/tasksBL')
const { getTokenFromHeaders, getUserFromToken } = require('./user.service');

// routes
router.post('/createTask', createTask);
router.post('/editTask', editTask);
router.get('/deleteTask', deleteTask);
router.get('/getAllTasks', getAllTasks);

module.exports = router;

function createTask(req, res, next) {
    const task = req.body
    // const user = getUserFromToken(getTokenFromHeaders(req))
    TasksBL.createTask(task)
        .then(status => res.json(status))
        .catch(next);
}

function editTask(req, res, next) {
    const task = req.body
    // const user = getUserFromToken(getTokenFromHeaders(req))
    TasksBL.editTask(task)
        .then(status => res.json(status))
        .catch(next);
}

function deleteTask(req, res, next) {
    const {id} = req.query
    TasksBL.deleteTask(id)
        .then(status => res.json(status))
        .catch(next);
}

function getAllTasks(req, res, next) {
    res.json({name: 'getAllTasks'})
}
