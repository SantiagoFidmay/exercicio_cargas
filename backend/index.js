const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/authMiddleware')
const authController = require('./controller/auth.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')

// ------------ Middleware ------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ----- Rotas Públicas ----

app.post('/funcionario',funcionarioController.cadastrar)
app.post('/login', authController.login)

// ---- MiddleWare que verifica se tem o token ------
app.use(authMiddleware)

//---- rotas Privadas ----

app.post('/motorista',motoristaController.cadastrar)
app.get('/motoristas',motoristaController.listar)
app.get('/motorista/buscarNome/:nome',motoristaController.consultarNome)
app.get('/motorista/:id', motoristaController.consultarID)
app.delete('/motorista/:id',motoristaController.apagar)
app.put('/motorista/:id',motoristaController.atualizar)

app.post('/entrega',entregaController.cadastrar)
app.get('/entregas',entregaController.listar)
app.post('/carga',cargaController.cadastrar)

app.get('/',(req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// --------- Sincronizando o servidor com o banco de dados -----

conn.sync()
    .then(()=>{
        app.listen(PORT,hostname, ()=>{
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao conectar com o banco de dados!',err)

    })
