

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;
    const msg = document.getElementById("msg");

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        msg.style.color = "red";
        msg.textContent = "Usuário já existe.";
        return;
    }

    usuarios.push({ nome, sobrenome, nascimento, email, tipo });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.style.color = "green";
    msg.textContent = "Usuário cadastrado com sucesso!";

    event.target.reset();
    atualizarTabela();
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
                <button onclick="excluirUsuario(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function excluirUsuario(index) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarTabela();
}

function voltar() {
    window.location.href = "../bancada/bancada.html";
}

window.onload = atualizarTabela;
