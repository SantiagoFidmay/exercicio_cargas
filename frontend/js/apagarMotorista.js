const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')


btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const codMotorista = document.getElementById('codMotorista').value

    fetch(`http://localhost:3000/motorista/${codMotorista}`,{
        method: 'DELETE',
        headers: {'Authorization': token}
    })
    .then(res => res.json())
    .then(dados => {

        console.log(dados.message)
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao apagar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar apagar o registro.</p>'
    })
})
