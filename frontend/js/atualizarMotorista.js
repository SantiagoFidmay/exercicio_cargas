const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault()

    const codMotorista = Number(document.getElementById('codMotorista').value)
    const nome = document.getElementById('nome').value
    const cnh = document.getElementById('cnh').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value

    if (!codMotorista) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Motorista!</p>'
        return
    }

    const motoristaAtualizado = {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        telefone: telefone
    }

    try {
        const res = await fetch(`http://localhost:3000/motorista/${codMotorista}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(motoristaAtualizado)
        })

        const dados = await res.json()

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
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

        document.querySelector('form').reset()

    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o motorista.</p>'
    }
})
