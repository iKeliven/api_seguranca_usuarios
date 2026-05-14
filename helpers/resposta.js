// padronização de respostas json 

//resposta de sucesso
function respostaSucesso(res, dados) {
    return res.status(200).json({
        sucesso: true,
        dados
    })
}

//resposta de erro
function respostaErro(res, erro, status = 400) {
    return res.status(status).json({
        sucesso: false,
        erro
    })
}

module.exports = {
    respostaSucesso,
    respostaErro
}