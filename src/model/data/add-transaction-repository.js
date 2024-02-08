class AddTransactionRepository {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async add (transaction) {
        const status = await this.transactionRepository.add(transaction)
        return status;
    }
}

module.exports = AddTransactionRepository