
const jwt = require("jsonwebtoken")

const SECRET = "senhadaapi"

module.exports = (req, res, next) => {
    //peegar a autorização do header do json
    const auth = req.headers["authorization"]

    //extrair o token de autorização 
    const token = auth && auth.split(" ")[1] 
    //colocando o nossotek numa lista
    /*
        "bearer",
        "token" 
        o [1] pega a posição 1 do array

        auth && auth.split = só vai executar o split se existir o auth 
    */
    if (!token){
        return res.status(401).json({
            sucesso: false,
            erro: "Token não enviado"
        })
    }

    //validação do JWT
    jwt.verify(token, SECRET, (err, user) =>{
        if (err) {
            return res.status(403).json({
                sucesso: false,
                erro: "Token não existe"
            })
        }
        req.user = user

    })

    next()
}