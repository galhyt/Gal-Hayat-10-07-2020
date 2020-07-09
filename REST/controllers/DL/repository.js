const getDbImpl = require('./factory')
const entities = require('./entities')
const {TaskEntity, UserEntity} = entities

class DbRepository {
    constructor() {
        this.db = getDbImpl("dbType")
        //this.cacheDb = getDbImpl("dbCacheType")
    }

    async createTask(task /*TaskEntity*/) {
        task.timeStamp = task.createDate = new Date().getTime()
        return await this.db.createTask(task)
    }

    async editTask(task /*TaskEntity*/) {
        task.timeStamp = new Date().getTime()
        return await this.db.editTask(task)
    }

    async deleteTask(id/*, userId*/) {
        return await this.db.deleteTask(id)
    }

    async getTasks(ids) {
        var tasks = await this.db.getTasks(ids)
        return tasks
    }

    async registerNewUser(user) {
        return await this.db.registerNewUser(user)
    }

    async authenticateUser(userName, password) {
        return await this.db.authenticateUser(userName, password)
    }

    async getUsers(ids) {
        return await this.db.getUsers(ids)
    }

    async getUser(id) {
        return await this.db.getUser(id)
    }
}

module.exports = DbRepository;