const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env(true)
var MongoClient = require('mongodb').MongoClient;
const DbInterface = require('./dbInterface')
const entities = require('./entities');
const { ObjectID } = require('mongodb');
const {TaskEntity, UserEntity} = entities

var dbConnection = "mongodb://"
if (process.env.DB_USER) dbConnection += process.env.DB_USER + ":" + process.env.DB_PASS
dbConnection+=process.env.DB_HOST+":"+process.env.DB_PORT+"/";
if (process.env.DB_USER) dbConnection += process.env.DB_USER


class MongoDbImpl extends DbInterface {
    DBNAME = process.env.DB_NAME
    connect(callback) {
        var options = {poolSize: 100,bufferMaxEntries: 0, useNewUrlParser: true, useUnifiedTopology: true}
        const self = this
        MongoClient.connect(dbConnection, options, async function(err, db) {
            if (err) throw err;
            var dbo = db.db(self.DBNAME);
            callback(dbo)
        })
    }

    async createTask(task /*TaskEntity*/) {
        var ret = false
        try {
            await new Promise((resolve, rej) => {
                this.connect(async function(dbo) {
                        dbo.collection("tasks").insertOne(task, function(err, res) {
                            if (err)
                                rej(err)
                            else
                                resolve()
                        })
                    })
            }).then(() => {ret = true})
        }
        catch(e) {
            console.log(e.message)
            return false
        }

        return ret
    }

    async editTask(task /*TaskEntity*/) {
        var ret = false
        try {
            await new Promise((resolve, reject) => {
                this.connect(async function(dbo) {
                        dbo.collection("tasks").updateOne({'_id': ObjectID(task._id)},{$set: {
                            title: task.title,
                            clientName: task.clientName,
                            clientPhone: task.clientPhone,
                            clientEmail: task.clientEmail,
                            timeStamp: task.timeStamp
                        }}, (err, res) => {
                            if (!err)
                                resolve()
                            else
                                reject(err)
                        })
                    })
            }).then(() => {ret = true})
        }
        catch(e) {
            console.log(e.message)
            return false
        }

        return ret
    }

    async deleteTask(id) {
        var ret = false
        try {
            await new Promise((resolve, reject) => {
                this.connect(async function(dbo) {
                        dbo.collection("tasks").deleteOne({"_id": ObjectID(id)}, function(err, res) {
                            if (err)
                                reject(err)
                            else
                                resolve()
                        })
                    })
            }).then(() => {ret = true})
        }
        catch(e) {
            console.log(e.message)
            return false
        }

        return ret
    }

    async getTasks(ids /*ids array*/) {
        try {
        }
        catch(e) {
            return null
        }

        return []
    }

    // async authenticateUser(userName, password) {
    //     var users = await this.loadFile(this.userFile)
    //     for (const id in users) {
    //         const user = users[id]
    //         if (user.userName == userName && user.password == password) return user
    //     }

    //     return null
    // }

    // async getUsers(ids) {
    //     const users = await this.loadFile(this.userFile)
    //     return ids.map(id => {
    //         return users[id]
    //     })
    // }

    // async getUser(id) {
    //     const users = await this.loadFile(this.userFile)
    //     return users[id]
    // }

    // private methods

}

module.exports = MongoDbImpl;