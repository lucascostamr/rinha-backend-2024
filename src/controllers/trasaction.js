const { badRequest, ok, serverError, ...helpers } = require('../helpers/http')

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
            const errorTypes = ['TransactionError', 'ClientNotFoundError']
            for(const type of errorTypes) {
                if(error.name === type) {
                    const helperName = `${error.name[0].toLowerCase()}${error.name.slice(1)}`
                    return helpers[helperName](error.message)
                }
            }
            return serverError();
        }
    }
}

module.exports = TransactionController