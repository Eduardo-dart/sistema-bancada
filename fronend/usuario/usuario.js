// lista em memória
let usuarios = [];
let indiceEdicao = -1; // -1 = não está editando

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;
    const msg = document.getElementById("msg");

    if (!nome || !sobrenome || !email || !senha || !tipo) {
        msg.style.color = "salmon";
        msg.textContent = "Preencha todos os campos.";
        return;
    }

    const novoUsuario = { nome, sobrenome, nascimento, email, senha, tipo };

    // Se estiver editando
    if (indiceEdicao >= 0) {
        usuarios[indiceEdicao] = novoUsuario;
        msg.style.color = "lightgreen";
        msg.textContent = `Usuário atualizado com sucesso!`;
        indiceEdicao = -1;
    } else {
        usuarios.push(novoUsuario);
        msg.style.color = "lightgreen";
        msg.textContent = `Usuário ${nome} ${sobrenome} cadastrado com sucesso!`;
    }

    atualizarTabela();
    document.getElementById("formUsuario").reset();
}

function atualizarTabela() {
    const tbody = document.querySelector("#tabelaUsuarios tbody");
    tbody.innerHTML = "";

    usuarios.forEach((u, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
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

        tbody.appendChild(linha);
    });
}

function excluirUsuario(index) {
    usuarios.splice(index, 1);
    atualizarTabela();
}

function editarUsuario(index) {
    const u = usuarios[index];

    // jogando valores no formulário
    document.getElementById("nome").value = u.nome;
    document.getElementById("sobrenome").value = u.sobrenome;
    document.getElementById("nascimento").value = u.nascimento;
    document.getElementById("email").value = u.email;
    document.getElementById("senha").value = u.senha;
    document.getElementById("tipo").value = u.tipo;

    indiceEdicao = index;

    const msg = document.getElementById("msg");
    msg.style.color = "yellow";
    msg.textContent = "Editando usuário... clique em Cadastrar para salvar alterações.";
}

// botão de voltar
function bancada(e) {
    if (e) e.preventDefault();
    window.location.href = "../bancada/bancada.html";
}
