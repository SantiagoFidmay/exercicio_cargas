const Motorista = require('../models/Motorista')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: "Cpf inválido!"})
    }

    try{
        
       const cnhCripto = cryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
       const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
       
        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })

        res.status(201).json({message: "dados cadastrados com sucesso!"})

    } catch(err){
        console.error('Erro ao cadastrar ',err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

const consultarID = async(req,res)=>{
    const id = req.params.id

    try {
      const motorista = await Motorista.findByPk(id)

      if(!motorista){
        return res.status(404).json({message: "Ciclista não encontrado!"})
      }

      const bytes = cryptoJs.AES.decrypt(motorista.cnh, CHAVE_SECRETA)
      const bytes2 = cryptoJs.AES.decrypt(motorista.cpf, CHAVE_SECRETA)

      const cnhDescriptografada = bytes.toString(cryptoJs.enc.Utf8)
      const cpfDescriptografado = bytes2.toString(cryptoJs.enc.Utf8)

      return res.status(200).json({
        codigo_motorista: motorista.codMotorista,
        nome: motorista.nome,
        cnh: cnhDescriptografada,
        cpf: cpfDescriptografado,
        telefone: motorista.telefone
      })

    } catch (err) {
        console.error('Erro ao consultar ',err)
        res.status(500).json({message: "Erro ao consultar"})
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome

    try {
      const motorista = await Motorista.findOne({where: {nome: nome}})

      if(!motorista){
        return res.status(404).json({message: "Motorista não encontrado!"})
      }

      const bytes = cryptoJs.AES.decrypt(motorista.cnh, CHAVE_SECRETA)
      const bytes2 = cryptoJs.AES.decrypt(motorista.cpf, CHAVE_SECRETA)

      const cnhDescriptografada = bytes.toString(cryptoJs.enc.Utf8)
      const cpfDescriptografado = bytes2.toString(cryptoJs.enc.Utf8)

      return res.status(200).json({
        codigo_motorista: motorista.codMotorista,
        nome: motorista.nome,
        cnh: cnhDescriptografada,
        cpf: cpfDescriptografado,
        telefone: motorista.telefone
      })

    } catch (err) {
        console.error('Erro ao consultar ',err)
        res.status(500).json({message: "Erro ao consultar"})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)

        if(!motorista){
            return res.status(404).json({message: "Motorista não encontrado!"})
        }

        await Motorista.destroy({where: {codMotorista: id}})
        return res.status(200).json({message: "Dados apagados com sucesso!"})

    } catch (err) {
        console.error('Erro ao apagar ',err)
        res.status(500).json({message: "Erro ao apagar"})
    }
}

const listar = async(req,res)=>{
    try {
        const motoristas = await Motorista.findAll()
        let resultado = []
        let cnhDescriptografada = ''
        let cpfDescriptografado = ''

        motoristas.forEach((el)=>{
            const bytes = cryptoJs.AES.decrypt(el.cnh,CHAVE_SECRETA)
            const bytes2 = cryptoJs.AES.decrypt(el.cpf,CHAVE_SECRETA)

            cnhDescriptografada = bytes.toString(cryptoJs.enc.Utf8)
            cpfDescriptografado = bytes2.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_motorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescriptografada,
                cpf: cpfDescriptografado,
                telefone: el.telefone
            })

        })

        res.status(200).json(resultado)
        


    } catch (err) {
        console.error('Erro ao listar ',err)
        res.status(500).json({message: "Erro ao listar"})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body


    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: "Cpf inválido!"})
    }

    try {
        let dados = await Motorista.findByPk(id)
        
        if(!dados){
            return res.status(404).json({message: "Motorista não encontrado!"})
        }else{
            valores.cnh = cryptoJs.AES.encrypt(valores.cnh,CHAVE_SECRETA).toString()
            valores.cpf = cryptoJs.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

            await Motorista.update(valores, {where: {codMotorista: id}})
            dados = await Motorista.findByPk(id)

            let bytes = cryptoJs.AES.decrypt(dados.cnh, CHAVE_SECRETA)
            let bytes2 = cryptoJs.AES.decrypt(dados.cpf, CHAVE_SECRETA)
      
            let cnhDescriptografada = bytes.toString(cryptoJs.enc.Utf8)
            let cpfDescriptografado = bytes2.toString(cryptoJs.enc.Utf8)

            return res.status(200).json({
                codigo_motorista: dados.codMotorista,
                nome: dados.nome,
                cnh: cnhDescriptografada,
                cpf: cpfDescriptografado,
                telefone: dados.telefone
              })
        }


    } catch (err) {
        console.error('Erro ao atualizar ',err)
        res.status(500).json({message: "Erro ao atualizar"})
    }

}

module.exports = {cadastrar, consultarID, consultarNome, apagar, listar, atualizar}