/* =========================
   MÁSCARA DE MOEDA (BR)
========================= */

const inputValor = document.getElementById("valor");

function formatarMoeda(valor) {
    valor = valor.replace(/\D/g, ""); // remove tudo que não for número

    if (!valor) return "";

    valor = (parseInt(valor, 10) / 100).toFixed(2);

    return valor
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function moedaParaNumero(valor) {
    return parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
    );
}

/* Aplica máscara em tempo real */
if (inputValor) {
    inputValor.addEventListener("input", () => {
        inputValor.value = formatarMoeda(inputValor.value);
    });
}

/* =========================
   TRANSFERÊNCIA
========================= */

document.getElementById("btn-confirmar").addEventListener("click", (e) => {
    e.preventDefault();

    const origem = localStorage.getItem("contaAtiva");
    const destino = document.getElementById("destino").value.trim();
    const valorFormatado = inputValor.value;

    if (!origem || !destino || !valorFormatado) {
        alert("Preencha todos os campos corretamente");
        return;
    }

    const valor = moedaParaNumero(valorFormatado);

    if (isNaN(valor) || valor <= 0) {
        alert("Informe um valor válido");
        return;
    }

    fetch("http://localhost:8080/contas/transferir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                origem: origem,
                destino: destino,
                valor: valor // ✅ número convertido
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                alert(data.mensagem);
                window.location.href = "dashboard.html";
            } else {
                alert(data.mensagem);
            }
        })
        .catch(() => {
            alert("Erro ao conectar ao servidor");
        });
});

/* =========================
   VOLTAR
========================= */

function voltar() {
    window.location.href = "dashboard.html";
}

/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    preloader.classList.add("hidden");

    setTimeout(() => {
        preloader.remove();
    }, 500);
});