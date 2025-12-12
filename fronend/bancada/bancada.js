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

// ---------- GERAR 28 BASES ALEATÓRIAS NO ESTOQUE ---------- //

function gerarBases() {

    const cores = ["azul", "preto", "vermelho", "vazia"]; 
    const estoqueDiv = document.getElementById("estoque-bases");

    estoqueDiv.innerHTML = ""; // limpa antes de gerar

    for (let i = 0; i < 28; i++) {

        // escolhe cor aleatória
        const cor = cores[Math.floor(Math.random() * cores.length)];

        // cria elemento
        const item = document.createElement("div");
        item.classList.add("base-item", `base-${cor}`);

        estoqueDiv.appendChild(item);
    }
}

// Gera as bases assim que a página carregar
window.onload = () => {
    gerarBases();
    polling(5);
};
