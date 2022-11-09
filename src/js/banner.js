let homeBanner = document.getElementById("homeBanner");
let qtdImagens = 4;

let sorteio = parseInt(Math.random() * qtdImagens); 
homeBanner.style.backgroundImage = `url(../../images/background/background-${sorteio + 1}.png)`;