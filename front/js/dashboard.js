document.addEventListener("DOMContentLoaded", () => {
    // Verifica se existe uma conta autenticada
    const contaAtiva = localStorage.getItem("contaAtiva");

    // Se não houver conta ativa, redireciona para o login
    if (!contaAtiva) {
        window.location.href = "index.html";
        return; // Para evitar que o código continue executando
    }

    // Botão para ir à transferência
    document.getElementById("btn-transferir")
        .addEventListener("click", () => {
            window.location.href = "transfer.html";
        });

    // Botão de sair (logout)
    document.getElementById("btn-sair")
        .addEventListener("click", () => {
            localStorage.removeItem("contaAtiva"); // Remove a conta da sessão
            window.location.href = "index.html"; // Redireciona para a página de login
        });
});