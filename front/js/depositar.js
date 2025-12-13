document.addEventListener("DOMContentLoaded", () => {

    const contaAtiva = localStorage.getItem("contaAtiva");

    if (!contaAtiva) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("btn-depositar").addEventListener("click", () => {

        const valor = Number(document.getElementById("deposito-valor").value);

        if (valor <= 0) {
            alert("Informe um valor válido");
            return;
        }

        fetch("http://localhost:8080/contas/depositar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    numero: contaAtiva,
                    valor: valor
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert(`Depósito realizado. Saldo atual: ${data.saldo}`);
                } else {
                    alert(data.mensagem);
                }
            })
            .catch(() => {
                alert("Erro ao conectar ao servidor");
            });
    });

    document.getElementById("btn-voltar").addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

});