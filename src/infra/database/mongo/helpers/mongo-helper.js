const { MongoClient } = require('mongodb')

const MongoHelper = {
    client: null,
    uri: null,

    async connect(uri) {
        this.client = await MongoClient.connect(uri)
        this.uri = uri
    },

    async disconnect() {
        this.client.close()
        this.client = null;
    },

    getCollection(name) {
        if(!this.client) this.connect(this.uri)
        return this.client.db().collection(name)
    }
}

module.exports = MongoHelper