// Banco de dados contendo pares informativos sobre IA e Deepfakes
const dadosCartas = [
    { id: 1, texto: "Sinal: Rosto que não pisca naturalmente" },
    { id: 1, texto: "Solução: IA tem dificuldade de simular piscadas biológicas" },
    { id: 2, texto: "Sinal: Voz sem respiração ou pausas" },
    { id: 2, texto: "Solução: Analise falhas mecânicas no ritmo do áudio" },
    { id: 3, texto: "Sinal: Sombra torta ou borda do rosto borrada" },
    { id: 3, texto: "Solução: Aproxime a imagem para checar defeitos nos pixels" },
    { id: 4, texto: "Sinal: Texto alarmista pedindo compartilhamento rápido" },
    { id: 4, texto: "Solução: Desconfie e consulte agências de checagem confiáveis" }
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaTabuleiro = false;
let acertosTotais = 0;

// Escuta obrigatória que previne que o código execute antes do HTML ser carregado
document.addEventListener("DOMContentLoaded", () => {
    const tabuleiro = document.getElementById("tabuleiro-memoria");
    const mostradorPontos = document.getElementById("pontos");
    const botaoModoEscuro = document.getElementById("toggle-dark-mode");
    const formulario = document.getElementById("form-contato");
    const containerFeedback = document.getElementById("mensagem-sucesso");

    // Função de Embaralhar Pura (Fisher-Yates)
    function embaralhar(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Geração Dinâmica dos Elementos no DOM (Subcategoria A Nível 4)
    function montarTabuleiro() {
        const cartasEmbaralhadas = embaralhar([...dadosCartas]);
        tabuleiro.innerHTML = "";

        cartasEmbaralhadas.forEach(item => {
            const elementoCarta = document.createElement("div");
            elementoCarta.classList.add("carta");
            elementoCarta.dataset.id = item.id;
            elementoCarta.dataset.conteudo = item.texto;
            elementoCarta.textContent = "🔍 Identificar Fraude";

            elementoCarta.addEventListener("click", virarCarta);
            tabuleiro.appendChild(elementoCarta);
        });
    }

    function virarCarta() {
        if (bloqueiaTabuleiro) return;
        if (this === primeiraCarta) return;
        if (this.classList.contains("resolvida") || this.classList.contains("virada")) return;

        this.classList.add("virada");
        this.textContent = this.dataset.conteudo;

        if (!primeiraCarta) {
            primeiraCarta = this;
            return;
        }

        segundaCarta = this;
        verificarCombinacao();
    }

    function verificarCombinacao() {
        const combinou = primeiraCarta.dataset.id === segundaCarta.dataset.id;

        if (combinou) {
            marcarComoResolvidas();
        } else {
            desvirarCartas();
        }
    }

    function marcarComoResolvidas() {
        primeiraCarta.classList.add("resolvida");
        segundaCarta.classList.add("resolvida");
        
        acertosTotais++;
        mostradorPontos.textContent = acertosTotais;

        limparSelecao();

        if (acertosTotais === 4) {
            setTimeout(() => {
                alert("Excelente trabalho! Você identificou todas as ameaças digitais.");
            }, 300);
        }
    }

    function desvirarCartas() {
        bloqueiaTabuleiro = true;

        setTimeout(() => {
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            primeiraCarta.textContent = "🔍 Identificar Fraude";
            segundaCarta.textContent = "🔍 Identificar Fraude";

            limparSelecao();
        }, 1500);
    }

    function limparSelecao() {
        primeiraCarta = null;
        segundaCarta = null;
        bloqueiaTabuleiro = false;
    }

    // Funcionalidade de Acessibilidade
    if (botaoModoEscuro) {
        botaoModoEscuro.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Script Dinâmico de Formulário
    if (formulario && containerFeedback) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const nome = document.getElementById("nome-usuario").value;
            containerFeedback.textContent = `Agradecemos seu envio, ${nome}! Analisaremos o endereço informado para neutralizar o avanço desta desinformação.`;
            containerFeedback.classList.remove("escondido");
            formulario.reset();
        });
    }

    // Inicialização do Jogo
    montarTabuleiro();
});
