const inputValor = document.getElementById("deposito-valor");

function moedaParaNumero(valor) {
    return parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
    );
}

/* ===== MÁSCARA DE MOEDA BR ===== */
function formatarMoeda(valor) {
    valor = valor.replace(/\D/g, ""); // só números

    if (!valor) return "";

    valor = (parseInt(valor, 10) / 100).toFixed(2);

    return valor.replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* Aplica máscara em tempo real */
inputValor.addEventListener("input", () => {
    inputValor.value = formatarMoeda(inputValor.value);
});

document.addEventListener("DOMContentLoaded", () => {

    const contaAtiva = localStorage.getItem("contaAtiva");

    if (!contaAtiva) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("btn-depositar").addEventListener("click", () => {

        const valorFormatado = document.getElementById("deposito-valor").value;

        if (!valorFormatado) {
            alert("Informe um valor válido");
            return;
        }

        const valor = moedaParaNumero(valorFormatado);

        if (isNaN(valor) || valor <= 0) {
            alert("Informe um valor válido");
            return;
        }

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

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");

    // remove do DOM depois da animação
    setTimeout(() => {
        preloader.remove();
    }, 500);
});