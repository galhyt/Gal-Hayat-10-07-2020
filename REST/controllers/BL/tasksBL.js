const DbRepository = require('../DL/repository')
const entities = require('../DL/entities')
const {TaskEntity, UserEntity} = entities

class TasksBL {
    static dbRep = new DbRepository()
    static async createTask(task) {
        const status = (await this.dbRep.createTask(task) ? 'OK' : 'Error')
        return {
            status: status,
            text: (status == 'OK' ? `Task "${task.title}" was created succesfully!` : `Error creating Task "${task.title}"!`)
        }
    }

    static async editTask(task) {
        const status = (await this.dbRep.editTask(task) ? 'OK' : 'Error')
        return {
            status: status,
            text: (status == 'OK' ? `Task "${task.title}" was modified succesfully!` : `Error with modifing Task "${task.title}"!`)
        }
    }

    static async deleteTask(id) {
        const status = (await this.dbRep.deleteTask(id) ? 'OK' : 'Error')
        return {
            status: status,
            text: (status == 'OK' ? `Task was deleted succesfully!` : `Error deleting Task!`)
        }
    }

    static async getTasks() {
        return await this.dbRep.getTasks()
    }

    static async getTask(id) {
        const tasks = await this.dbRep.getTasks(id)
        return tasks[0]
    }
}

module.exports = TasksBL;