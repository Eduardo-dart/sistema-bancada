function criar(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let sobrenome = document.getElementById("sobrenome").value.trim();
    let nascimento = document.getElementById("nascimento").value;
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let tipo = document.getElementById("tipo").value;
    let msg = document.getElementById("mensagem");

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
    fetch("http://localhost:1880/cadastrar/usuario",{
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

   
}
function criar() {
    window.location.href = "../usuario/login.html";
}
