class MakeTransaction {
    _limite
    _saldo
    constructor(clientRepository) {
        this.clientRepository = clientRepository
    }

    async make (transaction) {
        const { client_id, valor, tipo } = transaction
        const { limite, saldo_inicial} = await this.clientRepository.get(client_id)
        switch (tipo) {
            case "c":
                this._limite = +limite - (+valor)
                this._saldo = saldo_inicial
                break;
            case "d":
                this._saldo = +saldo_inicial - (+valor)
                this._limite = limite
                break;
        }
        return {
            limite: this._limite,
            saldo: this._saldo
        };
    }
}

module.exports = MakeTransaction