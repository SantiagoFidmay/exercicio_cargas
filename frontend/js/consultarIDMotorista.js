const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta_consultID = document.getElementById('resposta_consultID')
const btn_consultarID = document.getElementById('btn_consultarID')

btn_consultarID.addEventListener('click', async(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        
        const res = await fetch(`http://localhost:3000/motorista/${id}`,{
        headers: {'Authorization': token}
    })

        const dados = await res.json()

        if(!dados || dados.message){
            return resposta_consultID.innerHTML = `<p>${dados.message || 'Motorista não encontrado!'}</p>`
        }

        resposta_consultID.innerHTML = `
        
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CNH</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_motorista}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.cnh}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.telefone}</td>
                </tr>
            </tbody>
        </table>

        `

    } catch (err) {
        console.error('Erro ao consultar o motorista', err)
        resposta_consultID.innerHTML = '<p>Erro ao consultar o motorista!</p>'
    }
})