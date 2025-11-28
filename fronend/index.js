function login() {
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let msg = document.getElementById("mensagem");

    // Usuário e senha de exemplo
    let usuarioCorreto = "lula";
    let senhaCorreta = "13";

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        msg.style.color = "green";
        msg.textContent = "Login realizado com sucesso!";

        setTimeout(() => {
            // ALERTA (opcional)
            alert("Bem-vindo!");

            // 👉 AQUI VEM O REDIRECIONAMENTO
            window.location.href = "https://www.google.com"; 
        }, 500);

    } else {
        msg.style.color = "red";
        msg.textContent = "Usuário ou senha incorretos!";
    }
}