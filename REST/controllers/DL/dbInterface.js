class DbInterface {
    constructor() {
        if (!this.createTask)
            this.throwError('createTask')

        if (!this.editTask)
            this.throwError('editTask')

        if (!this.deleteTask)
            this.throwError('deleteTask')

        if (!this.getTasks)
            this.throwError('registerNewUser')

        // if (!this.authenticateUser)
        //     this.throwError('authenticateUser')

        // if (!this.getUsers)
        //     this.throwError('getUsers')

        // if (!this.getUser)
        //     this.throwError('getUser')
    }

    throwError(methodName) {
        throw new Error('Error: '+ methodName + ' method must be implemented!')
    }
}

module.exports = DbInterface;