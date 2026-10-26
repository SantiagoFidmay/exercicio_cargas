const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadEntrega = document.getElementById('btn_cadEntrega')

btn_cadEntrega.addEventListener('click', (e)=>{
    e.preventDefault()

    const destino = document.getElementById('destino').value
    const status = document.getElementById('status').value
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const idCarga = document.getElementById('idCarga').value


    const valores = {
        destino: destino,
        status: status,
        data: data,
        hora: hora,
        idCarga: idCarga
    }

    fetch(`http://localhost:3000/entrega`,{
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
