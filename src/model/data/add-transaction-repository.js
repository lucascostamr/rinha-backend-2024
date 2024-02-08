class AddTransactionRepository {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async add (transaction) {
        await this.transactionRepository.add(transaction)
    }
}

module.exports = AddTransactionRepository