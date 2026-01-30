function login(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;
    const msg = document.getElementById("mensagem");

    if (!nome || !sobrenome || !nascimento || !email || !senha || !tipo) {
        msg.style.color = "red";
        msg.textContent = "Preencha todos os campos.";
        return;
    }

    const novoUsuario = {
        nome,
        sobrenome,
        nascimento,
        email,
        tipo
    };
    fetch("http://localhost:1880/usuarios",{
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

    // salva usuário logado
    sessionStorage.setItem("usuario", JSON.stringify(novoUsuario));

    // salva no sistema de usuários
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.email === email);

    msg.style.color = "green";
    msg.textContent = "Login realizado com sucesso!";

    setTimeout(() => {
        window.location.href = "bancada/bancada.html";
    }, 500);
}
