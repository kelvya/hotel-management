//---------------------------------------------------------------------
// RESERVAS
//---------------------------------------------------------------------
const quartos = [
    {
        nome: "executive",
        valor: 190
    },
    {
        nome: "classic",
        valor: 250
    },
    {
        nome: "premium",
        valor: 400
    }
]


const checkin = document.querySelector("#checkin")
const checkout = document.querySelector("#checkout")
const qtdPessoas = document.querySelector("#qtdPessoas")
const resumo = document.querySelector("#bookingSummary p")

let qtdAtual = 1

// Carrega informações do localstorage (caso já exista)
localStorage.getItem("checkin")
    ? (resumo.children[1].innerText += localStorage.getItem("checkin"))
    : null

localStorage.getItem("checkout")
    ? (resumo.children[2].innerText += localStorage.getItem("checkout"))
    : null

if(localStorage.getItem("qtdPessoas")){
    qtdAtual = localStorage.getItem("qtdPessoas")
}
resumo.children[3].innerText += qtdAtual

if (localStorage.getItem("quarto")) {
    switch (localStorage.getItem("quarto")) {
        case "classic":
            resumo.children[0].innerText += "Classic"
            resumo.children[4].innerText += (quartos[1]["valor"] * qtdAtual)
            break
        case "premium":
            resumo.children[0].innerText += "Premium"
            resumo.children[4].innerText += (quartos[2]["valor"] * qtdAtual)
            break
        default:
            resumo.children[0].innerText += "Executive"
            resumo.children[4].innerText += (quartos[0]["valor"] * qtdAtual)
            break
    }
}



// Guarda no localstorage o valor do checkin sempre que for mudado
checkin.onchange = function() {
    localStorage.setItem("checkin", checkin.value)
    resumo.children[1].innerText = `Check-in: ${localStorage.getItem("checkin")}`
}
// Guarda no localstorage o valor do checkout sempre que for mudado
checkout.onchange = function () {
    localStorage.setItem("checkout", checkout.value)
    resumo.children[2].innerText = `Check-out: ${localStorage.getItem(
        "checkout"
    )}`

}
// Guarda no localstorage o valor da quantidade de pessoas sempre que for mudado
qtdPessoas.onchange = function () {
    localStorage.setItem("qtdPessoas", qtdPessoas.value)
    qtdAtual = localStorage.getItem("qtdPessoas")
    resumo.children[3].innerText = `Pessoas: ${qtdAtual}`

    switch (resumo.children[0].innerText) {
        case "Apartamento: Classic":
            resumo.children[4].innerText = `Valor total: ${
                quartos[1]["valor"] * qtdAtual
            }`
            break
        case "Apartamento: Premium":
            resumo.children[4].innerText = `Valor total: ${
                quartos[2]["valor"] * qtdAtual
            }`
            break
        default:
            resumo.children[4].innerText = `Valor total: ${
                quartos[0]["valor"] * qtdAtual
            }`
            break
    }
}

// Verificar quando e qual opção de quarto foi selecionada 
$("input[name='roomChoice']").click(function() {
    
    if($(this).prop('checked')) {

        switch ($(this).val()) {
            case "classic":
                localStorage.setItem("quarto", quartos[1]['nome'])
                resumo.children[0].innerText = `Apartamento: Classic`
                resumo.children[4].innerText = `Valor total: ${
                    quartos[1]["valor"] * qtdAtual
                }`
                break
            case "premium":
                localStorage.setItem("quarto", quartos[2]["nome"])
                resumo.children[0].innerText = `Apartamento: Premium`
                resumo.children[4].innerText = `Valor total: ${
                    quartos[2]["valor"] * qtdAtual
                }`
                break
            default:
                localStorage.setItem("quarto", quartos[0]["nome"])
                resumo.children[0].innerText = `Apartamento: Executive`
                resumo.children[4].innerText = `Valor total: ${
                    quartos[0]["valor"] * qtdAtual
                }`
                break
        }
    }

})

