const { badRequest, ok, serverError, ...helpers } = require('../helpers/http')
const MissingParamError = require('../errors/missing-param-error')

class TransactionController {
    constructor(makeTransactionModel, saveTransactionModel) {
        this.makeTransactionModel = makeTransactionModel
        this.saveTransactionModel = saveTransactionModel
    }

    async handle(httpRequest) {
        try {
            const transaction = structuredClone(httpRequest.body)
            const requiredFields = ['client_id', 'valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!transaction[field]) return badRequest(new MissingParamError(field))
            const status = await this.makeTransactionModel.make(transaction)
            await this.saveTransactionModel.save(transaction)
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