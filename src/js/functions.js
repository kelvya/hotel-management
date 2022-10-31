let formulario = document.querySelector("#login_formulario");
let usuario = 'joaozinho_silva@gmail.com';
let senha = '123456';


// Ao clicar no botão CONFIRMAR, o formulário é submetido
formulario.addEventListener('submit', (e) => {
    // console.log(formulario.elements["usuarioLogin"].value);
    // console.log(formulario.elements["senhaLogin"].value.length)

    // Remove caracteres do campo de usuário
    let caracteresRemoviveis = ['"', "'", ' '];
    let usuarioLimpo = formulario.elements["usuarioLogin"].value;
    // Verifica letra a letra se existe algum dos caracteres removíveis e caso tenha, substitui por espaço em branco
    for (let pos of caracteresRemoviveis) {
        usuarioLimpo = usuarioLimpo.split(pos).join("");
    }

    // Verificar se os valores dos campos são maiores que 1 (possuem algum caracter)
    if (
        formulario.elements["usuarioLogin"].value.length < 1 ||
        formulario.elements["senhaLogin"].value.length < 1
    ) {
        alert("Favor preencher usuário e senha")
        // e.preventDefault()
        return;
    }

    // Verificar se o usuário e senha conferem com o usuário criado
    if (
        formulario.elements["usuarioLogin"].value !== usuario ||
        formulario.elements["senhaLogin"].value !== senha
    ) {
        alert("Usuário ou senha não encontrado")
        // e.preventDefault()
        return;
    }

    localStorage.setItem("usuario", formulario.elements["usuarioLogin"].value);

    // // Pausa o 'submit'
    // e.preventDefault()
});