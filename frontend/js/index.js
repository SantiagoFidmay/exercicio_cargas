let verificar_log = document.getElementById('verificar_log')
let token = localStorage.getItem('token')
let nome = localStorage.getItem('nome')

if(token){
    verificar_log.innerHTML = `<a href="#" id="btn_logout" >Logout</a>&emsp;`
    verificar_log.innerHTML += `<span class="titulo_menu">Usuário: ${nome}</span>&emsp;`

    let btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', (e)=>{
        e.preventDefault()
        localStorage.clear()
        location.reload()
    })

}else{
    verificar_log.innerHTML = ``
}
