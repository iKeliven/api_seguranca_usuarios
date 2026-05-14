//middleware de validacao de usuarios

module.exports = (req, res, next) => {
    const {nome, email, senha, telefone, idade} = req.body

    //verificar campos obrigatorios
    if(!nome || !email || !senha ||  !telefone || !idade){
        return res.status(400).json({
            sucesso: false,
            erro: "Todos os campos precisam ser preenchidos"
        })
    }

    //Sanitização: Limpar espaços com trim().
    req.body.nome = nome.trim()
    req.body.email = email.trim()

    //verificar se a idade é positiva
        if(typeof idade !== "number" || idade <= 0){
            return res.status(400).json({
                sucesso: false,
                erro: "Idade inválida"
            })
        }

    //regex do telefone
    /* Regex é uma forma de validar cmapos como email, cpf, telefone, senha etcc
    aqui nessa api vamos criar uma regra de texto par que fique no formato
    (ddd) 00000-0000 ou (ddd) 0000-0000*/
 
    const regexTelefone = /^\(\d{2})\s\d{4,5}-\d{4}$/
    /* sumário do regex
        / = inicio da regra
        ^ = início da string (o telefone deve começar exatamente assim)
        \( = usado para receber o caractere especial "(" 
        \d{2} = formatação de 2 números (11, 48, 21...)
        \) = fecha parênteses ")"
        \s = espaço obrigatório
        \d{4,5} = aceita 4 OU 5 números (funciona para celulares: 99637 ou fixo: 3269)
        - = hífen obrigatório (para separar as duas partes do numero de telefone)
        \d(4) = aceita exatamente 4 números
        $ = fim da string (acabou o numero de telefone)
        / = fim da regra regex
    */
        
    //verificar se o telefone é válido
    if (!regexTelefone.text(telefone)) {
        return res.status(400).json({
            sucesso: false,
            erro: "Telefone inválido."
        })
    }

    next();
}
