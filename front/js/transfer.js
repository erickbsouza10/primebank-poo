document.getElementById("btn-confirmar").addEventListener("click", (e) => {
    e.preventDefault();

    const origem = localStorage.getItem("contaAtiva");
    const destino = document.getElementById("destino").value;
    const valor = Number(document.getElementById("valor").value);

    if (!origem || !destino || valor <= 0) {
        alert("Preencha todos os campos corretamente");
        return;
    }

    fetch("http://localhost:8080/contas/transferir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                origem,
                destino,
                valor
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

function voltar() {
    window.location.href = "dashboard.html";
}