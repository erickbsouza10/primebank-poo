const msg = document.getElementById("msg");

/* CRIAR CONTA */
document.getElementById("btn-criar").addEventListener("click", () => {
    const titular = document.getElementById("titular").value;
    const numero = document.getElementById("numero").value;
    const pin = document.getElementById("pinCriar").value;

    if (!titular || !numero || pin.length !== 4) {
        msg.innerText = "Preencha todos os campos e PIN com 4 dígitos";
        return;
    }

    fetch("http://localhost:8080/contas/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titular, numero, pin })
        })
        .then(res => res.json())
        .then(conta => {
            msg.innerText = `Conta ${conta.numero} criada com sucesso`;
        })
        .catch(() => {
            msg.innerText = "Erro ao criar conta";
        });
});

/* LOGIN */
document.getElementById("btn-login").addEventListener("click", (e) => {
    e.preventDefault();

    const numero = document.getElementById("numeroLogin").value;
    const pin = document.getElementById("pinLogin").value;

    fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numero, pin })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                localStorage.setItem("contaAtiva", numero);
                window.location.href = "dashboard.html";
            } else {
                msg.innerText = data.mensagem;
            }
        });
});