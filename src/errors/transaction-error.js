class TransactionError extends Error {
    constructor(message) {
        super(`Transaction error: ${message}`)
        this.name = 'TransactionError'
    }
}

module.exports = TransactionError