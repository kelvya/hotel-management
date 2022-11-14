//---------------------------------------------------------------------
// LOGIN - ADMIN
//---------------------------------------------------------------------
const adminFormulario = document.querySelector("#admin_formulario")

// Ao clicar no botão CONFIRMAR, o formulário de administração é submetido
adminFormulario.addEventListener("submit", (e) => {
    let nome = "João Silva"
    let usuario = "joaozinho_silva@gmail.com"
    let senha = "123456"

    // Remove caracteres do campo de usuário
    let caracteresRemoviveis = ['"', "'", " "]
    let usuarioLimpo = adminFormulario.elements["adminEmail"].value

    // Verifica letra a letra se existe algum dos caracteres removíveis e caso tenha, substitui por espaço em branco
    for (let pos of caracteresRemoviveis) {
        usuarioLimpo = usuarioLimpo.split(pos).join("")
    }

    // Verificar se os valores dos campos são maiores que 1 (possuem algum caracter)
    if (
        adminFormulario.elements["adminEmail"].value.length < 1 ||
        adminFormulario.elements["adminSenha"].value.length < 1
    ) {
        alert("Favor preencher usuário e senha")
        // Pausa o 'submit'
        e.preventDefault()
        return
    }

    // Verificar se o usuário e senha conferem com o usuário criado
    if (
        adminFormulario.elements["adminEmail"].value !== usuario ||
        adminFormulario.elements["adminSenha"].value !== senha
    ) {
        alert("Usuário ou senha não encontrado")
        e.preventDefault()
        return
    }

    localStorage.setItem(
        "funcionario",
        adminFormulario.elements["adminEmail"].value
    )

    
})
