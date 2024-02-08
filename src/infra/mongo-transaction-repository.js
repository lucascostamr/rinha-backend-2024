const MongoHelper = require('./helpers/mongo-helper')

class MongoTransactioRepository {
    async make(transaction) {
        const clientCollection = MongoHelper.getCollection('clients')
        const { client_id, valor, tipo, descricao } = transaction
        const client = await clientCollection.find({ id: client_id })

        console.log(client)
        switch (tipo) {
            case "c":
                client.limite += -(+valor)
                break;
            case "d":
                client.saldo += (+client.saldo_inicial - (+valor))
                break
        }

        return {
            limite: client.limite,
            saldo: client.saldo
        }
    }
}

module.exports = MongoTransactioRepository