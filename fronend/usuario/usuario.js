// lista em memória (necessária)
let usuarios = [];

// função chamada no onsubmit do formulário
function cadastrarUsuario(event) {
    event.preventDefault();

    // pega valores do formulário
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const msg = document.getElementById("msg");

    // validações simples (exemplo)
    if (!nome || !sobrenome || !email || !senha) {
        msg.style.color = "salmon";
        msg.textContent = "Preencha todos os campos.";
        return;
    }

    // cria objeto usuário (agora DENTRO da função)
    const novoUsuario = {
        nome,
        sobrenome,
        nascimento,
        email,
        senha
    };

    // adiciona na lista
    usuarios.push(novoUsuario);

    // atualiza a tabela
    atualizarTabela();

    // feedback visual
    msg.style.color = "lightgreen";
    msg.textContent = `Usuário ${nome} ${sobrenome} cadastrado com sucesso!`;

    // limpa o formulário
    document.getElementById("formUsuario").reset();
}

// atualiza a tabela DOM com a lista 'usuarios'
function atualizarTabela() {
    const tbody = document.querySelector("#tabelaUsuarios tbody");
    tbody.innerHTML = ""; // limpa

    usuarios.forEach((u, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.sobrenome}</td>
            <td>${u.nascimento}</td>
            <td>${u.email}</td>
            <td>
                <button class="btn-excluir" onclick="excluirUsuario(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(linha);
    });
}

// remove usuário por índice e atualiza tabela
function excluirUsuario(index) {
    usuarios.splice(index, 1);
    atualizarTabela();
}

// função para voltar/ir à página da bancada
function bancada(e) {
    if (e) e.preventDefault();
    // ajustar o caminho conforme sua estrutura de pastas:
    window.location.href = "../bancada/bancada.html";
}
