class TransactionController {
    constructor(makeTransaction) {
        this.makeTransaction = makeTransaction
    }

    async handle(httpRequest) {
        try {
            const requiredFields = ['client_id', 'valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!httpRequest.body[field]) return { statusCode: 400}
            const transaction = await this.makeTransaction.make(httpRequest.body)
            return {
                statusCode: 200,
                body: transaction
            };
        } catch (error) {
            return { statusCode: 500};
        }
    }
}

module.exports = TransactionController