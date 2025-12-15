function limparInputsLoginECadastro() {
    // cadastro
    document.getElementById("titular").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("pinCriar").value = "";

    // login
    document.getElementById("numeroLogin").value = "";
    document.getElementById("pinLogin").value = "";
}


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
        limparInputsLoginECadastro();
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



window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.classList.add("hidden");



    // remove do DOM depois da animação

    setTimeout(() => {

        preloader.remove();

    }, 500);

});



//modal ficticio

document.addEventListener("DOMContentLoaded", () => {



    const btnCriar = document.getElementById("btn-criar");

    const modal = document.getElementById("modal-criacao");

    const progressBar = document.getElementById("progress-bar");



    const etapaImg = document.getElementById("etapa-img");

    const etapaTitulo = document.getElementById("etapa-titulo");

    const etapaDesc = document.getElementById("etapa-desc");



    if (!btnCriar) return;



    btnCriar.addEventListener("click", () => {



        modal.classList.remove("hidden");



        // Etapa 1

        etapaImg.src = "img/etapa1.png";

        etapaTitulo.innerText = "Analisando dados";

        etapaDesc.innerText = "Estamos validando suas informações…";

        progressBar.style.width = "33%";



        // Etapa 2

        setTimeout(() => {

            etapaImg.src = "img/etapa2.png";

            etapaTitulo.innerText = "Criando sua conta";

            etapaDesc.innerText = "Configurando seu acesso bancário…";

            progressBar.style.width = "66%";

        }, 2000);



        // Etapa 3

        setTimeout(() => {

            etapaImg.src = "img/etapa3.png";

            etapaTitulo.innerText = "Conta criada com sucesso!";

            etapaDesc.innerText = "Redirecionando para o login…";

            progressBar.style.width = "100%";

        }, 4000);



        // Fecha modal

        setTimeout(() => {

            modal.classList.add("hidden");

        }, 6000);

    });



});