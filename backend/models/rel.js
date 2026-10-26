const Carga = require('./Carga')
const Entrega = require('./Entrega')
const Funcionario = require('./Funcionario')
const Motorista = require('./Motorista')

Motorista.hasMany(Carga,{
    foreignKey: 'idMotorista',
    as: 'cargaMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista,{
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    allowNull: false
})


Carga.hasMany(Entrega,{
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga,{
    foreignKey: 'idCarga',
    as: 'cargaEntrega',
    allowNull: false
})


module.exports = {Carga, Entrega,Funcionario, Motorista}
