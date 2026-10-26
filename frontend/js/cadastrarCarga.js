const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadCarga = document.getElementById('btn_cadCarga')

btn_cadCarga.addEventListener('click', (e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const peso = document.getElementById('peso').value
    const volume = document.getElementById('volume').value
    const codRastreio = document.getElementById('codRastreio').value
    const idMotorista = document.getElementById('idMotorista').value

    const valores = {
        descricao: descricao,
        peso: peso,
        volume: volume,
        codRastreio: codRastreio,
        idMotorista: idMotorista
    }

    fetch(`http://localhost:3000/carga`,{
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
        console.error('Erro ao cadastrar a carga',err)

    })

})
