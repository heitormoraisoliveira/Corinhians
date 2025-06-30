const caixaInicio = document.querySelector(".caixa-inicio");
const caixaJogo = document.querySelector(".caixa-jogo");
const inputNome = document.getElementById("nomeJogador");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

let nome = "";
let atual = 0;
let historiaFinal = "";
let escolheuRuim = false;

function iniciarJogo() {
    nome = inputNome.value.trim();
    if (nome === "") {
        alert("Digite seu nome para começar!");
        return;
    }
    perguntas = personalizarPerguntas(perguntasBase, nome);
    caixaInicio.style.display = "none";
    caixaJogo.style.display = "block";
    mostraPergunta();
}

const perguntasBase = [
    {
        enunciado: "Você foi contratado pelo Corinthians. Qual sua primeira atitude?",
        alternativas: [
            {
                texto: "Chegar cedo, treinar forte e ouvir os veteranos.",
                afirmacao: "Mostrou dedicação desde o primeiro dia, conquistando respeito e confiança.",
            },
            {
                texto: "Postar nas redes sociais antes do treino.",
                afirmacao: "A torcida gostou, mas a comissão técnica ficou com um pé atrás.",
            },
            {
                texto: "Faltar no primeiro dia alegando compromissos pessoais.",
                afirmacao: "Gerou desconfiança sobre sua seriedade.",
                ruim: true
            },
            {
                texto: "Discutir com um veterano no vestiário.",
                afirmacao: "Começou com conflito interno e perdeu moral com o grupo.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Você foi convocado para uma entrevista na TV. O que faz?",
        alternativas: [
            {
                texto: "Exalta o clube e fala sobre o foco no título.",
                afirmacao: "Ganhou apoio da torcida e da diretoria pela postura profissional.",
            },
            {
                texto: "Evita polêmicas e fala o mínimo possível.",
                afirmacao: "Foi prudente, mas perdeu chance de criar conexão com a torcida.",
            },
            {
                texto: "Critica o esquema tático do treinador ao vivo.",
                afirmacao: "Gerou mal-estar no grupo e risco de punição interna.",
                ruim: true
            },
            {
                texto: "Faz piadas e debocha de outros clubes.",
                afirmacao: "A entrevista viralizou negativamente. Imagem arranhada.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "O time perdeu um clássico. Como você reage?",
        alternativas: [
            {
                texto: "Vai ao treino no dia seguinte focado e lidera a recuperação.",
                afirmacao: "Virou referência de superação e comprometimento.",
            },
            {
                texto: "Fica em silêncio e evita redes sociais.",
                afirmacao: "Evita exposição, mas deixa a torcida apreensiva.",
            },
            {
                texto: "Critica a torcida pela pressão.",
                afirmacao: "A relação com a Fiel ficou estremecida.",
                ruim: true
            },
            {
                texto: "Sai pra balada na mesma noite.",
                afirmacao: "Péssima repercussão na imprensa e entre os torcedores.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Você recebe proposta milionária da Europa. E agora?",
        alternativas: [
            {
                texto: "Agradece o interesse, mas quer conquistar títulos antes de sair.",
                afirmacao: "Virou ídolo e teve a confiança eterna da torcida.",
            },
            {
                texto: "Conversa com a diretoria para encontrar o melhor momento de saída.",
                afirmacao: "Manteve a ética e foi respeitado pelo clube e torcida.",
            },
            {
                texto: "Faz pressão pública para sair logo.",
                afirmacao: "A torcida se sentiu traída pela sua atitude.",
                ruim: true
            },
            {
                texto: "Sai escondido e assina sem avisar.",
                afirmacao: "A imagem ficou manchada e perdeu carinho do torcedor.",
                ruim: true
            }
        ]
    }
];

function personalizarPerguntas(base, nome) {
    return base.map(pergunta => ({
        enunciado: pergunta.enunciado.replace(/você/gi, nome),
        alternativas: pergunta.alternativas.map(alt => ({
            texto: alt.texto,
            afirmacao: alt.afirmacao.replace(/você/gi, nome),
            ruim: alt.ruim || false
        }))
    }));
}

let perguntas = [];

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    textoResultado.textContent = "";
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.onclick = () => {
            historiaFinal += alternativa.afirmacao + " ";
            if (alternativa.ruim) escolheuRuim = true;
            atual++;
            mostraPergunta();
        };
        caixaAlternativas.appendChild(botao);
    });
}

function mostraResultado() {
    caixaPerguntas.textContent = `Carreira de ${nome} no Corinthians:`;
    caixaAlternativas.innerHTML = "";

    if (escolheuRuim) {
        textoResultado.textContent =
            "Apesar do talento, suas decisões prejudicaram a carreira. Faltou comprometimento e postura profissional. A torcida lembra com decepção.";
    } else {
        textoResultado.textContent = historiaFinal;
    }
}
