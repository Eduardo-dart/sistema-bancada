

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let indiceEdicao = null;

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value.trim();
    const msg = document.getElementById("msg");
    fetch("http://localhost:1880/usuario/cadastro",{
        method:"POST",
        body:JSON.stringify({nome, sobrenome, nascimento, email, senha, tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then(()=>{
        alert("salvo")
    })

    atualizarTabela();
    event.target.reset();
}

function atualizarTabela() {
    const tbody = document.querySelector("#tabelaUsuarios tbody");
    tbody.innerHTML = "";

    usuarios.forEach((u, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.sobrenome}</td>
            <td>${u.nascimento}</td>
            <td>${u.email}</td>
            <td>${u.tipo}</td>
            <td>
                <button onclick="editarUsuario(${index})"
                style= "background:#f1c40f;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-weight:bold;">Editar</button>
                <button onclick="excluirUsuario(${index})"
                style = "background:#FF2C2C;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-weight:bold;">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function editarUsuario(index) {
    const u = usuarios[index];

    document.getElementById("nome").value = u.nome;
    document.getElementById("sobrenome").value = u.sobrenome;
    document.getElementById("nascimento").value = u.nascimento;
    document.getElementById("email").value = u.email;
    document.getElementById("tipo").value = u.tipo;

    indiceEdicao = index;
    document.querySelector(".btn").textContent = "Salvar Alterações";
    fetch("http://localhost:1880/usuarios/editar",{
        method:"POST",
        body:JSON.stringify({nome, sobrenome, nascimento, email, senha, tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then(()=>{
        alert("atualizado")
    })
}

function excluirUsuario() {
   fetch("http://localhost:1880/usuario/excluir",{
        method:"DELETE",
        body:JSON.stringify({nome, sobrenome, nascimento, email, senha, tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then(()=>{
        alert("usuario excluído")
    })
}

function voltar() {
    window.location.href = "../bancada/bancada.html";
}

window.onload = atualizarTabela;
