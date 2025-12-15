document.addEventListener("DOMContentLoaded", () => {

    // const contaAtiva = localStorage.getItem("contaAtiva");

    // // Proteção de rota
    // if (!contaAtiva) {
    //     window.location.href = "index.html";
    //     return;
    // }

    // Buscar saldo da conta
    fetch(`http://localhost:8080/contas/${contaAtiva}`)
        .then(res => res.json())
        .then(conta => {
            if (conta && typeof conta.saldo === "number") {
                document.getElementById("saldo").innerText =
                    `R$ ${conta.saldo.toFixed(2)}`;
            } else {
                document.getElementById("saldo").innerText = "Erro ao carregar";
            }
        })
        .catch(() => {
            document.getElementById("saldo").innerText = "Erro de conexão";
        });

    // Ir para transferência
    document.getElementById("btn-transferir")
        .addEventListener("click", () => {
            window.location.href = "transfer.html";
        });

    // Logout
    document.getElementById("btn-sair").addEventListener("click", () => {
        localStorage.removeItem("contaAtiva");
        window.location.href = "index.html";
    });

});