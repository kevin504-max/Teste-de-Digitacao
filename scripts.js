const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const btn_alterar_tema = document.querySelector("#alterar_tema");

const frases = [
    "A vida trará coisas boas se tiveres paciência.",
    "Demonstre amor e alegria em todas as oportunidades e verás que a paz nasce dentro de você.",
    "Não compense na ira o que lhe falta na razão.",
    "Defeitos e virtudes são apenas dois lados da mesma moeda.",
    "A maior de todas as torres começa no solo.",
    "Não há que ser forte. Há que ser flexível.",
    "Gente todo dia arruma os cabelos, por que não o coração?",
    "Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.",
    "A juventude não é uma época da vida, é um estado de espírito.",
    "Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.",
    "Dê toda a atenção para a formação dos teus filhos, sobretudo por exemplos de tua própria vida.",
    "Siga os bons e aprenda com eles.",
    "Não importa o tamanho da montanha, ela não pode tapar o sol.",
    "O bom-senso vai mais longe do que muito conhecimento.",
    "Quem quer colher rosas deve suportar os espinhos.",
    "São os nossos amigos que nos ensinam as mais valiosas lições.",
    "Uma iniciativa mal-sucedida não significa o final de tudo. Sempre existe uma nova oportunidade.",
    "Aquele que se importa com o sentimento dos outros, não é um tolo.",
    "A adversidade é um espelho que reflete o verdadeiro eu.",
    "Lamentar aquilo que não temos é desperdiçar aquilo que já possuímos.",
    "Uma bela flor é incompleta sem suas folhas.",
    "Sem o fogo do entusiasmo, não há o calor da vitória.",
    "Não há melhor negócio que a vida. A gente há obtém a troco de nada.",
    "O riso é a menor distância entre duas pessoas.",
    "Você é jovem apenas uma vez. Depois precisa inventar outra desculpa.",
    "É mais fácil conseguir o perdão do que a permissão.",
    "Os defeitos são mais fortes quando o amor é fraco."
];

function gerarFrase() {
    const index = Math.floor(Math.random() * frases.length);
    texto.textContent = frases[index];
}

function atualizarTeste() {
    iniciar();

    if (entrada.value === texto.textContent) {
        verificarTexto();
    }
}

function iniciar() {
    const statusTeste = JSON.parse(localStorage.getItem("testeEmAndamento")); 

    if (!statusTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificarTexto() {
    const tempoFinal = new Date().getTime();
    const tempoGasto = (tempoFinal - localStorage.getItem("tempoInicial")) / 1000;

    resultado.textContent = `Parabéns! Você digitou a frase corretamente em ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto);

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";

    gerarFrase();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement("p");

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto} segundos`;

    historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
    entrada.value = "";
    resultado.textContent = "";  
    gerarFrase();
    localStorage.setItem("testeEmAndamento", false);
    historico.innerHTML = ""; 
}

function alterarTema() {
    const body = document.body;

    body.classList.toggle("claro");
    body.classList.toggle("escuro");
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);

btn_alterar_tema.addEventListener("click",alterarTema);

gerarFrase();