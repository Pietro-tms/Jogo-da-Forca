const palavras = [
    "morango",
    "banana",
    "maça",
    "machado",
    "ferro",
    "batata",
    "lapis",
    "caneta",
    "predio",
    "escola", 
    "pavilhao",
    "colheitadeira"

];
const tracos = document.querySelector('#palavra');
const erroAcerto = document.querySelector('#errouAcertou');
const bonequinho = document.querySelector('#boneco');
const mostraChances = document.querySelector('#chances');
const letrasChutadas = document.querySelector('#letras');

function novaPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

let palavraEscolhida = novaPalavra();
let exibicao = [];
let chances = 8;
let verificacao = [];

function iniciar() {
    document.addEventListener("DOMContentLoaded", () => {
        chute.focus();
    });

    for (let i = 0; i < palavraEscolhida.length; i++) {
        exibicao[i] = "_";
    }

    tracos.innerHTML = exibicao.join(" ");
}

iniciar();

chute.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        chutar();
    }
});

chute.addEventListener("input", () => {
    chute.value = chute.value
        .replace(/[^a-záàâãéèêíïóôõöúç]/gi, '')
        .slice(0, 1);
});

function chutar() {
    let letra = chute.value.toLowerCase().trim();
    let acertou = false;

    if (letra === '') {
        erroAcerto.innerHTML = "Preencha o espaço antes de chutar";
        return;
    }

    if (!letra.match(/^[a-záàâãéèêíïóôõöúç]$/i)) {
        erroAcerto.innerHTML = "Digite apenas letras!";
        chute.value = '';
        return;
    }

    if (verificacao.includes(letra)) {
        erroAcerto.innerHTML = "Você já chutou essa letra!";
        chute.value = '';
        return;
    }

    verificacao.push(letra);

    if (letrasChutadas.innerHTML == "---------------") {
        letrasChutadas.innerHTML = '';
    }

    letrasChutadas.innerHTML += letra + ' ';

    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (letra === palavraEscolhida[i]) {
            exibicao[i] = letra;
            acertou = true;
        }
    }

    tracos.innerHTML = exibicao.join(" ");
    chute.value = '';
    chute.focus();


    verifica(acertou);
}

function verifica(acertou) {
    if (acertou) {
        erroAcerto.innerHTML = "Parabéns, você acertou!";
    } else {
        erroAcerto.innerHTML = "Que pena, Você errou!";

        chances--;
        mostraChances.innerHTML = chances;

        bonequinho.src = `/img/forca${9 - chances}.png`;
    }

    if (chances == 0) {
        perdeu();
    }

    if (palavraEscolhida == exibicao.join('')) {
        ganhou();
    }
}

function ganhou() {

    setTimeout(() => {
        alert("você ganhou!");
        resetar();
    }, 1000);


}

function perdeu() {
    alert("Que pena, você perdeu! A palavra era " + palavraEscolhida);

    resetar();
}

function resetar() {

    exibicao = [];

    palavraEscolhida = novaPalavra();

    chances = 8;

    verificacao = [];

    mostraChances.innerHTML = chances;

    bonequinho.src = "/img/forca1.png";

    erroAcerto.innerHTML = "---------------";

    letrasChutadas.innerHTML = "---------------";

    iniciar();

    chute.focus();

}