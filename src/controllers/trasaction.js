const { badRequest, ok, serverError, transactionError } = require('../helpers/http')

class TransactionController {
    constructor(makeTransaction, saveTransaction) {
        this.makeTransaction = makeTransaction
        this.saveTransaction = saveTransaction
    }

    async handle(httpRequest) {
        try {
            const transaction = structuredClone(httpRequest.body)
            const requiredFields = ['client_id', 'valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!transaction[field]) return badRequest()
            const status = await this.makeTransaction.make(transaction)
            await this.saveTransaction.save(transaction)
            return ok(status)
        } catch (error) {
            if(error.name === 'TransactionError') return transactionError(error.message)
            return serverError();
        }
    }
}

module.exports = TransactionController