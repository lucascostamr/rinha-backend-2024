class MakeTransaction {
    constructor(clientRepository) {
        this.clientRepository = clientRepository
    }

    async make (transaction) {
        const client = await this.clientRepository.get(transaction.client_id)
        return {
            limite: "any_limite",
            saldo: "any_saldo"
        };
    }
}

module.exports = MakeTransaction