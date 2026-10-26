const Entrega = require('../models/Entrega')



const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.destino || !valores.status || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
       
        await Entrega.create({
            destino: valores.destino,
            status: valores.status,
            data: valores.data,
            hora: valores.hora,
            idCarga: valores.idCarga,
          
        })

        res.status(201).json({message: "dados cadastrados com sucesso!"})

    } catch(err){
        console.error('Erro ao cadastrar ',err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}


const listar = async(req,res)=>{
    try{
        const entregas = await Entrega.findAll()
        res.status(200).json(entregas)
    }catch(err){
        console.error('Erro ao listar a entrega',err)
        res.status(500).json({message: 'Erro ao listar a entrega!'})
    }
}


module.exports = {cadastrar, listar}