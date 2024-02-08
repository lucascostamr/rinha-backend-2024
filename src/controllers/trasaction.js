class TransactionController {
    constructor(addTransactionRepository) {
        this.addTransactionRepository = addTransactionRepository
    }

    async handle(httpRequest) {
        try {
            const requiredFields = ['valor', 'tipo', 'descricao']
            for(const field of requiredFields) if(!httpRequest[field]) return 400
            await this.addTransactionRepository.add(httpRequest)
        } catch (error) {
            return 500;
        }
    }
}

module.exports = TransactionController