// Verifica se existe uma conta autenticada
const contaAtiva = localStorage.getItem("contaAtiva");

if (!contaAtiva) {
    window.location.href = "index.html";
}

// Botão para ir à transferência
document.getElementById("btn-transferir")
    .addEventListener("click", () => {
        window.location.href = "transfer.html";
    });

// Botão de sair (logout)
document.getElementById("btn-sair")
    .addEventListener("click", () => {
        localStorage.removeItem("contaAtiva");
        window.location.href = "index.html";
    });