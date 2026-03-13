let pedidos = []

function adicionarPedido(){

let cliente = document.getElementById("cliente").value
let produto = document.getElementById("produto").value
let quantidade = document.getElementById("quantidade").value

if(cliente === "" || produto === "" || quantidade === ""){
    alert("Preencha todos os campos")
    return
}

let pedido = {
    cliente: cliente,
    produto: produto,
    quantidade: quantidade
}

pedidos.push(pedido)

atualizarTabela()

document.getElementById("cliente").value = ""
document.getElementById("produto").value = ""
document.getElementById("quantidade").value = ""

}

function atualizarTabela(){

let tabela = document.getElementById("tabelaPedidos")

tabela.innerHTML = ""

pedidos.forEach((pedido, index) => {

let linha = `
<tr>
<td>${pedido.cliente}</td>
<td>${pedido.produto}</td>
<td>${pedido.quantidade}</td>
<td>
<button class="btn-excluir" onclick="excluirPedido(${index})">Excluir</button>
</td>
</tr>
`

tabela.innerHTML += linha

})

}

function excluirPedido(index){

pedidos.splice(index,1)

atualizarTabela()

}