const Carga = require('../models/Carga')


const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio || !valores.idMotorista){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }


    try{
       
        await Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            codRastreio: valores.codRastreio,
            idMotorista: valores.idMotorista,
    
        })

        res.status(201).json({message: "dados cadastrados com sucesso!"})

    } catch(err){
        console.error('Erro ao cadastrar ',err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

module.exports = {cadastrar}