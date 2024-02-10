const TransactionError = require('../../../errors/transaction-error')

class MakeTransaction {
    _limite
    _saldo
    constructor(getClientRepository) {
        this.getClientRepository = getClientRepository
    }

    async make (transaction) {
        if(!transaction || Object.keys(transaction).length === 0) {
            return new Promise((resolve, reject) => reject(new Error()))
        }
        const { client_id, valor, tipo } = transaction
        const { limite, saldo_inicial } = await this.getClientRepository.get(client_id)
        switch (tipo) {
            case "c":
                this._limite = +limite - (+valor)
                this._saldo = +saldo_inicial
                break;
            case "d":
                this._saldo = +saldo_inicial - (+valor)
                this._limite = +limite
                break;
        }
        if(this._saldo < (-this._limite)) {
            return new Promise((resolve, reject) => reject(new TransactionError('Transaction below limit')))
        }
        return {
            limite: this._limite,
            saldo: this._saldo
        };
    }
}

module.exports = MakeTransaction