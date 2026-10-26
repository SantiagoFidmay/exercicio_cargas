const resposta = document.getElementById('resposta')
const btn_cadFuncionario = document.getElementById('btn_cadFuncionario')

btn_cadFuncionario.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/funcionario`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
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