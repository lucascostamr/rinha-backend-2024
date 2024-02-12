class SaveTransactionModel {
  constructor(addTransactionStub) {
    this.addTransactionStub = addTransactionStub
  }

  async save(transaction) {
    const lastTransactions = await this.addTransactionStub.add(transaction)
    return lastTransactions
  }
}
module.exports = SaveTransactionModel