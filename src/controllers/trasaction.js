class TransactionController {
    constructor(makeTransaction, saveTransaction) {
        this.makeTransaction = makeTransaction
        this.saveTransaction = saveTransaction
    }

    async handle(httpRequest) {
        try {
            const requiredFields = ['client_id', 'valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!httpRequest.body[field]) return { statusCode: 400}
            const status = await this.makeTransaction.make(httpRequest.body)
            await this.saveTransaction.save(httpRequest.body)
            return {
                statusCode: 200,
                body: status
            };
        } catch (error) {
            return { statusCode: 500};
        }
    }
}

module.exports = TransactionController