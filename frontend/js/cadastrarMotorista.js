const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadMotorista = document.getElementById('btn_cadMotorista')

btn_cadMotorista.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cnh = document.getElementById('cnh').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value

    const valores = {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        telefone: telefone,
    }

    fetch(`http://localhost:3000/motorista`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)

    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `${dados.message}`
    })

    .catch((err)=>{
        console.error('Erro ao cadastrar o usuário',err)

    })

})
