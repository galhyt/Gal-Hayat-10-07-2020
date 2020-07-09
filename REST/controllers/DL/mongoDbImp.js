const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env(true)
var MongoClient = require('mongodb').MongoClient;
const DbInterface = require('./dbInterface')
const entities = require('./entities');
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
        try {
        }
        catch(e) {
            return false
        }

        return true
    }

    async deleteTask(id) {
        try {
        }
        catch(e) {
            return false
        }

        return true
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