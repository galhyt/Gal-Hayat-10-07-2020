const express = require('express');
const router = express.Router();
const TasksBL = require('./BL/tasksBL')
const { getTokenFromHeaders, getUserFromToken } = require('./user.service');

// routes
router.post('/createTask', createTask);
router.post('/editTask', editTask);
router.get('/deleteTask', deleteTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getTask', getTask);

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
    try {
        TasksBL.editTask(task)
            .then(status => res.json(status))
            .catch(next);
    }
    catch(e) {
        console.log(e.message)
    }
}

function deleteTask(req, res, next) {
    const {id} = req.query
    TasksBL.deleteTask(id)
        .then(status => res.json(status))
        .catch(next);
}

function getAllTasks(req, res, next) {
    TasksBL.getTasks()
        .then(tasks => res.json(tasks))
        .catch(next);
}

function getTask(req, res, next) {
    const {id} = req.query
    TasksBL.getTask(id)
        .then(task => res.json(task))
        .catch(next);
}
