//arquivo principal 
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//chamar o middlewares criados
const middlawareValidador = require("./middlewares/validarUsuario")
const auth = require("./middlewares/auth")

const {respostaSucesso, respostaErro } = require("./helpers/resposta")

const app = express()
app.use(express.json())

const SECRET = "senhadaapi"

//simulacao de banco de dados
const usuarios = []



//funcao de cadastro de usuario
app.post("/usuarios", middlawareValidador, async(req, res) => {
    const {nome, email, senha, telefone, idade} = req.body

    //criptografando a senha
    const senhaHash = await bcrypt.hash(senha, 10)

    /* ao inves de salvar a senha como '123456',
    ele salva no banco de dados '$2*b@10....' */

    const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        senha: senhaHash,
        telefone,
        idade
    }
    //inserindo o novousuario na lista de usuários
    usuarios.push(novoUsuario)

    //funcao que impede que a senha retorne quando o usuario for buscado
    const usuarioSemSenha = {
        id: novoUsuario.id,
        nome,
        email,
        idade,
        telefone
    }

    return respostaSucesso(res, usuarioSemSenha)
})


//login
app.post("/login", async(req, res) => {
    
    const { email, senha} = req.body

    const usuario = usuarios.find(u => u.email === email )
})




//rodar o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})