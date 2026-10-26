const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch('http://localhost:3000/entregas', {
        headers: {'Authorization': token}
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
                    <th>Destino</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Código Carga</th>
                </tr>
            </thead>

            <tbody>
                ${dados.map(el => `
                    <tr>
                        <td>${el.codEntrega}</td>
                        <td>${el.destino}</td>
                        <td>${el.status}</td>
                        <td>${el.data}</td>
                        <td>${el.hora}</td>
                        <td>${el.idCarga}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `
    } catch (err) {
        console.error('Erro ao listar as entregas', err)
        resposta.innerHTML = '<p>Erro ao listar as entregas.</p>'
    }
})
