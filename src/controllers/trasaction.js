class TransactionController {
    constructor(addTransactionRepository) {
        this.addTransactionRepository = addTransactionRepository
    }

    handle(httpRequest) {
        const requiredFields = ['valor', 'tipo', 'descricao']
        for(const field of requiredFields) if(!httpRequest[field]) return 400
        this.addTransactionRepository.add(httpRequest)
    }
}

module.exports = TransactionController