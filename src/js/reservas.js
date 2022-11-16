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

let qtdAtual = 1

// Carrega informações do localstorage (caso já exista)
localStorage.getItem("checkin")
    ? document.querySelector("#bookingCheckIn").innerText = localStorage.getItem("checkin")
    : null

localStorage.getItem("checkout")
    ? (document.querySelector("#bookingCheckOut").innerText = localStorage.getItem("checkout"))
    : null

if(localStorage.getItem("qtdPessoas")){
    qtdAtual = localStorage.getItem("qtdPessoas")
}
document.querySelector("#bookingQtd").innerText = qtdAtual

if (localStorage.getItem("quarto")) {
    switch (localStorage.getItem("quarto")) {
        case "classic":
            document.querySelector("#bookingApt").innerText = "Classic"
            document.querySelector("#bookingValor").innerText = quartos[1]["valor"] * qtdAtual
            break
        case "premium":
            document.querySelector("#bookingApt").innerText = "Premium"
            document.querySelector("#bookingValor").innerText += (quartos[2]["valor"] * qtdAtual)
            break
        default:
            document.querySelector("#bookingApt").innerText = "Executive"
            document.querySelector("#bookingValor").innerText += (quartos[0]["valor"] * qtdAtual)
            break
    }
}

// Guarda no localstorage o valor do checkin sempre que for mudado
checkin.onchange = function() {
    localStorage.setItem("checkin", checkin.value)
    document.querySelector("#bookingCheckIn").innerText = `${localStorage.getItem("checkin")}`
}
// Guarda no localstorage o valor do checkout sempre que for mudado
checkout.onchange = function () {
    localStorage.setItem("checkout", checkout.value)
    document.querySelector("#bookingCheckOut").innerText = `${localStorage.getItem("checkout")}`

}
// Guarda no localstorage o valor da quantidade de pessoas sempre que for mudado
qtdPessoas.onchange = function () {
    localStorage.setItem("qtdPessoas", qtdPessoas.value)
    qtdAtual = localStorage.getItem("qtdPessoas")
    document.querySelector("#bookingQtd").innerText = `${qtdAtual}`

    switch (document.querySelector("#bookingApt").innerText) {
        case "Classic":
            document.querySelector("#bookingValor").innerText = `R$ ${(quartos[1]["valor"] * qtdAtual).toFixed(2)}`
            break
        case "Premium":
            document.querySelector("#bookingValor").innerText = `R$ ${(quartos[2]["valor"] * qtdAtual).toFixed(2)}`
            break
        default:
            document.querySelector("#bookingValor").innerText = `R$ ${(quartos[0]["valor"] * qtdAtual).toFixed(2)}`
            break
    }
}

// Verificar quando e qual opção de quarto foi selecionada 
$("input[name='roomChoice']").click(function() {
    
    if($(this).prop('checked')) {

        switch ($(this).val()) {
            case "classic":
                localStorage.setItem("quarto", quartos[1]['nome'])
                document.querySelector("#bookingApt").innerText = `Classic`
                document.querySelector("#bookingValor").innerText = `R$ ${(quartos[1]["valor"] * qtdAtual).toFixed(2)}`
                break
            case "premium":
                localStorage.setItem("quarto", quartos[2]["nome"])
                document.querySelector("#bookingApt").innerText = `Premium`
                document.querySelector("#bookingValor").innerText = `R$ ${(quartos[2]["valor"] * qtdAtual).toFixed(2)}`
                break
            default:
                localStorage.setItem("quarto", quartos[0]["nome"])
                document.querySelector("#bookingApt").innerText = `Executive`
                document.querySelector("#bookingValor").innerText = `R$ ${(quartos[0]["valor"] * qtdAtual).toFixed(2)}`
                break
        }
    }

})

