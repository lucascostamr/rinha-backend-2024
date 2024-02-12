const badRequest = (error) => ({
    statusCode: 400,
    body: error
})

const transactionError = (error) => ({
    statusCode: 422,
    body: error
})

const clientNotFoundError = (error) => ({
    statusCode: 404,
    body: error
})

const serverError = (error) => ({
    statusCode: 500,
    body: error
})

const ok = (message) => ({
    statusCode: 200,
    body: message
})

module.exports = {
    badRequest,
    transactionError,
    clientNotFoundError,
    serverError,
    ok
}