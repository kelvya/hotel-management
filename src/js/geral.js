//---------------------------------------------------------------------
// GERAL
//---------------------------------------------------------------------
let usuarioLogado

function mostrarSaudacao() {

    document.querySelector("#logado").classList.remove('esconder');
    document.querySelector(
        "#logado-usuario"
    ).innerText = `Olá usuário ${localStorage.getItem("usuario")}`
}

// Verifica se existe algum usuário guardado no local storage
localStorage.usuario
    ? mostrarSaudacao()
    : document.querySelector("#logado").classList.add("esconder")
