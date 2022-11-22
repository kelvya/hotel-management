//---------------------------------------------------------------------
// RESERVAS
//---------------------------------------------------------------------
const quartos = [
  {
    nome: "executive",
    valor: 190,
    descricao:
      "Descrição EXECUTIVE Standard ipsum dolor sit amet consectetur adipisicing elit. Sit nobis aliquam quibusdam aliquid quam perferendis autem eum numquam earum nam corporis mollitia cumque error, id quod laboriosam standard.",
  },
  {
    nome: "classic",
    valor: 250,
    descricao:
      "Descrição CLASSIC Standard ipsum dolor sit amet consectetur adipisicing elit. Sit nobis aliquam quibusdam aliquid quam perferendis autem eum numquam earum nam corporis mollitia cumque error, id quod laboriosam standard.",
  },
  {
    nome: "premium",
    valor: 400,
    descricao:
      "Descrição PREMIUM Standard ipsum dolor sit amet consectetur adipisicing elit. Sit nobis aliquam quibusdam aliquid quam perferendis autem eum numquam earum nam corporis mollitia cumque error, id quod laboriosam standard.",
  },
];

const checkin = document.querySelector("#checkin");
const checkout = document.querySelector("#checkout");
const qtdPessoas = document.querySelector("#qtdPessoas");

let qtdAtual = 1;

// Carrega informações do localstorage (caso já exista)
if (localStorage.getItem("checkin")) {
  document.querySelector("#bookingCheckIn").innerText =
    localStorage.getItem("checkin");
  checkin.value = localStorage.getItem("checkin");
}

if (localStorage.getItem("checkout")) {
  document.querySelector("#bookingCheckOut").innerText =
    localStorage.getItem("checkout");
  checkout.value = localStorage.getItem("checkout");
}

if (localStorage.getItem("qtdPessoas")) {
  qtdAtual = localStorage.getItem("qtdPessoas");
  qtdPessoas.value = qtdAtual;
}
document.querySelector("#bookingQtd").innerText = qtdAtual;

if (localStorage.getItem("quarto")) {
  switch (localStorage.getItem("quarto")) {
    case "classic":
      document.querySelector("#bookingApt").innerText = "Classic";
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[1]["valor"] * qtdAtual
      ).toFixed(2)}`;
      document.querySelector("#classic").checked = true;
      break;
    case "premium":
      document.querySelector("#bookingApt").innerText = "Premium";
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[2]["valor"] * qtdAtual
      ).toFixed(2)}`;
      document.querySelector("#premium").checked = true;
      break;
    default:
      document.querySelector("#bookingApt").innerText = "Executive";
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[0]["valor"] * qtdAtual
      ).toFixed(2)}`;
      document.querySelector("#executive").checked = true;
      break;
  }
}

// Guarda no localstorage o valor do checkin sempre que for mudado
checkin.onchange = function () {
  localStorage.setItem("checkin", checkin.value);
  document.querySelector("#bookingCheckIn").innerText = `${localStorage.getItem(
    "checkin"
  )}`;

  //Apaga valor de checkout
  checkout.value = "";
  document.querySelector("#bookingCheckOut").innerText = "";
  localStorage.removeItem("checkout");
};
// Guarda no localstorage o valor do checkout sempre que for mudado
checkout.onchange = function () {
  //Verifica se checkout é posterior ao check-in
  if (checkout.value > checkin.value) {
    localStorage.setItem("checkout", checkout.value);
    document.querySelector(
      "#bookingCheckOut"
    ).innerText = `${localStorage.getItem("checkout")}`;
  } else {
    alert("A data de check-out deve ser posterior a de check-in");
    checkout.value = "";
  }
};
// Guarda no localstorage o valor da quantidade de pessoas sempre que for mudado
qtdPessoas.onchange = function () {
  localStorage.setItem("qtdPessoas", qtdPessoas.value);
  qtdAtual = localStorage.getItem("qtdPessoas");
  document.querySelector("#bookingQtd").innerText = `${qtdAtual}`;

  switch (document.querySelector("#bookingApt").innerText) {
    case "Classic":
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[1]["valor"] * qtdAtual
      ).toFixed(2)}`;
      break;
    case "Premium":
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[2]["valor"] * qtdAtual
      ).toFixed(2)}`;
      break;
    default:
      document.querySelector("#bookingValor_modal").innerText = `R$ ${(
        quartos[0]["valor"] * qtdAtual
      ).toFixed(2)}`;
      break;
  }
};

// Verificar quando e qual opção de quarto foi selecionada
$("input[name='roomChoice']").click(function () {
  if ($(this).prop("checked")) {
    switch ($(this).val()) {
      case "classic":
        localStorage.setItem("quarto", quartos[1]["nome"]);
        document.querySelector("#bookingApt").innerText = `Classic`;
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[1]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
      case "premium":
        localStorage.setItem("quarto", quartos[2]["nome"]);
        document.querySelector("#bookingApt").innerText = `Premium`;
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[2]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
      default:
        localStorage.setItem("quarto", quartos[0]["nome"]);
        document.querySelector("#bookingApt").innerText = `Executive`;
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[0]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
    }
  }
});

// Verificar quando e qual opção de quarto foi selecionada
$("#continuar").click(function () {
  if (
    localStorage.getItem("quarto") &&
    localStorage.getItem("checkin") &&
    localStorage.getItem("checkout") &&
    localStorage.getItem("qtdPessoas")
  ) {
    $("#modalContinuar").modal("show")

    document.querySelector("#bookingApt_modal").innerText =
      localStorage.getItem("quarto")[0].toUpperCase() +
      localStorage.getItem("quarto").substr(1);
    document.querySelector("#bookingCheckIn_modal").innerText =
      localStorage.getItem("checkin");
    document.querySelector("#bookingCheckOut_modal").innerText =
      localStorage.getItem("checkout");
    document.querySelector("#bookingQtd_modal").innerText =
      localStorage.getItem("qtdPessoas");

    switch (localStorage.getItem("quarto")) {
      case "classic":
        document.querySelector("#modal-quarto p:nth-of-type(1)").innerText =
          quartos[1]["descricao"];
        document.querySelector(
          "#modal-quarto p:nth-of-type(2)"
        ).innerText = `R$ ${quartos[1]["valor"].toFixed(2)}`;
        document.querySelector("#bookingImg_modal").src =
          "/images/acomodacoes/acomodacoes-luxo-1.png";
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[1]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
      case "premium":
        document.querySelector("#modal-quarto p:nth-of-type(1)").innerText =
          quartos[2]["descricao"];
        document.querySelector(
          "#modal-quarto p:nth-of-type(2)"
        ).innerText = `R$ ${quartos[2]["valor"].toFixed(2)}`;
        document.querySelector("#bookingImg_modal").src =
          "/images/acomodacoes/acomodacoes-standard-1.png";
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[2]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
      default:
        document.querySelector("#modal-quarto p:nth-of-type(1)").innerText =
          quartos[0]["descricao"];
        document.querySelector(
          "#modal-quarto p:nth-of-type(2)"
        ).innerText = `R$ ${quartos[0]["valor"].toFixed(2)}`;
        document.querySelector("#bookingImg_modal").src =
          "/images/acomodacoes/acomodacoes-presidencial-1.png";
        document.querySelector("#bookingValor_modal").innerText = `R$ ${(
          quartos[0]["valor"] * qtdAtual
        ).toFixed(2)}`;
        break;
    }
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});

//SERVICOS ADICIONAIS

const servicosAdicionais = [
  {
    nome: "Academia",
    preco: 100,
  },
  {
    nome: "Early check-in/Late Check-in",
    preco: 50,
  },
  {
    nome: "Café da manhã",
    preco: 190,
  },
  {
    nome: "Serviço de lavanderia",
    preco: 100,
  },
  {
    nome: "Serviço de spa",
    preco: 250,
  },
]

let precoAtualizado, criaInputNumber, criaSpan, inputValores, inputServicos
const spanValorTotal = document.querySelector("#valorTotal");
for(let i = 0; i < servicosAdicionais.length; i++){
    criaInputNumber = document.createElement("input")
    criaSpan = document.createElement("span")
    criaInputNumber.setAttribute("type", "number")
    criaInputNumber.setAttribute("min", "0")
    criaInputNumber.setAttribute("value", "1")
    criaInputNumber.setAttribute("class", "d-block")
    criaInputNumber.setAttribute("id", "inputServicos")
    criaInputNumber.setAttribute("name", "valores")
    criaSpan.setAttribute("class", "precoAtualizado")
    document.getElementById("modal-servicos").appendChild(criaSpan);
    document.getElementById("modal-servicos").appendChild(criaInputNumber);
    if(i == servicosAdicionais.length -1){
        precoAtualizado = document.querySelectorAll(".precoAtualizado")
        inputValores = document.getElementsByName('valores')
        inputServicos = document.querySelectorAll("#inputServicos")
    } 
}

$("#maisServicos").click(function () {
    $("#modalMaisServicos").modal("show");    
    inputValores.forEach(function(valorInput, index){
      $(`#inputServicos:nth-of-type(${index+1})`).attr("max", qtdAtual)
      if(valorInput.value > qtdAtual) valorInput.value = 1
      let total = 0, resultado
      valorInput.addEventListener("change", function(){
        localStorage.setItem(`inputValores${index+1}`, valorInput.value)
        resultado = 0
        const servicoPrecoTotal = servicosAdicionais[index].preco * valorInput.value
        precoAtualizado[index].innerHTML = `${servicosAdicionais[index].nome} - R$${(servicoPrecoTotal).toFixed(2)}`
        precoAtualizado.forEach((n, index) =>{
          resultado += parseInt(precoAtualizado[index].innerHTML.substring((precoAtualizado[index].innerHTML.indexOf('$')+1), precoAtualizado[index].innerHTML.length))
          total = resultado
        })
        spanValorTotal.innerHTML = `R$${total.toFixed(2)}`
      })
  })
})

window.onload = inputValores.forEach(function(valorInput, index){
  !!localStorage.getItem(`inputValores${index+1}`) ? valorInput.value = localStorage.getItem(`inputValores${index+1}`) : null
  !!localStorage.getItem(`inputValores${index+1}`) ? 
  precoAtualizado[index].innerHTML = `${servicosAdicionais[index].nome} - R$${(servicosAdicionais[index].preco * localStorage.getItem(`inputValores${index+1}`)).toFixed(2)}` 
  : precoAtualizado[index].innerHTML = `${servicosAdicionais[index].nome} - R$${(servicosAdicionais[index].preco * document.getElementById("inputServicos").min).toFixed(2)}`
})