window.onload = ()=>{
    polling(5)
}

function polling(segundos){
    setTimeout(()=>{
        console.log('buscando...')
        buscarDadosBancada()
        polling(segundos)
    },segundos*1000)
}

function buscarDadosBancada(){
    fetch('http://10.77.241.165:1880/api/smartsense/estoque')
    .then(res=>res.json())
    .then(data=>{
        console.log
    })
}

function sair(e){
    e.preventDefault()
    console.log("redirecionando")
    window.location.href = "../index.html"
}

function usuarios(e){
    e.preventDefault()
    console.log("redirecionando")
    window.location.href = "usuario/usuario.html"
}

