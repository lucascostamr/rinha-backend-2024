class TransactionController {
    handle(httpRequest) {
        const requiredFields = ['valor', 'tipo']
        for(const field of requiredFields) if(!httpRequest[field]) return 400
    }
}

module.exports = TransactionController