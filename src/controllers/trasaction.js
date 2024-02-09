class TransactionController {
    constructor(makeTransaction, saveTransaction) {
        this.makeTransaction = makeTransaction
        this.saveTransaction = saveTransaction
    }

    async handle(httpRequest) {
        try {
            const transaction = structuredClone(httpRequest.body)
            const requiredFields = ['client_id', 'valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!transaction[field]) return { statusCode: 400 }
            const status = await this.makeTransaction.make(transaction)
            await this.saveTransaction.save(transaction)
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