const config = require('config.json');
const MongoDbImpl = require('./mongoDbImp')

function getDbImpl(entry) {
    switch (config[entry]) {
        case "mongodb":
            return new MongoDbImpl()
            break;
        case "memory":
            throw new Error('Error: needs to be implemented!')
            break;
    }
}

module.exports = getDbImpl;