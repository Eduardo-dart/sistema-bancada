let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let indiceEdicao = null;

document.getElementById("formUsuario").addEventListener("submit", cadastrarUsuario);

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;

    const usuario = { nome, sobrenome, nascimento, email, senha, tipo };

    if (indiceEdicao !== null) {
        usuarios[indiceEdicao] = usuario;
        indiceEdicao = null;
    } else {
        usuarios.push(usuario);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 🔥 SEU FETCH (mantido)
    fetch("http://localhost:1880/cadastros/editar", {
        method: "POST",
        body: JSON.stringify(usuario)
    });

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
                <button class="btn-editar" onclick="editarUsuario(${index})">Editar</button>
                <button class="btn-excluir" onclick="excluirUsuario(${index})">Excluir</button>
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
}

function excluirUsuario(index) {

    const usuario = usuarios[index];

    // remove do front
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 🔥 envia pro Node-RED
    fetch("http://localhost:1880/usuario/excluir", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: usuario.email
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Usuário excluído no sistema");
    });

    atualizarTabela();
}
function voltar() {
    window.location.href = "../bancada/bancada.html";
}

window.onload = atualizarTabela;