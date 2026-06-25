// Dados do Jogo - Pares Correspondentes (ID iguais formam o par correto)
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

// Variáveis de controle do estado do jogo
let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaTabuleiro = false;
let acertosTotais = 0;

// Esta função garante que o código só roda quando TODO o HTML estiver pronto na tela
document.addEventListener("DOMContentLoaded", () => {
    const tabuleiro = document.getElementById("tabuleiro-memoria");
    const mostradorPontos = document.getElementById("pontos");
    const botaoModoEscuro = document.getElementById("toggle-dark-mode");
    const formulario = document.getElementById("form-contato");
    const containerFeedback = document.getElementById("mensagem-sucesso");

    // Verifica se os elementos essenciais existem na página para evitar erros de compilação
    if (!tabuleiro || !mostradorPontos) {
        console.error("Erro: Elementos do tabuleiro não foram encontrados no HTML.");
        return;
    }

    // 1. Função para embaralhar as cartas (Algoritmo Fisher-Yates estável)
    function embaralhar(array) {
        let indiceAtual = array.length, indiceAleatorio;
        while (indiceAtual !== 0) {
            indiceAleatorio = Math.floor(Math.random() * indiceAtual);
            indiceAtual--;
            [array[indiceAtual], array[indiceAleatorio]] = [array[indiceAleatorio], array[indiceAtual]];
        }
        return array;
    }

    // 2. Função para construir visualmente as cartas dentro do HTML
    function montarTabuleiro() {
        const cartasEmbaralhadas = embaralhar([...dadosCartas]);
        tabuleiro.innerHTML = ""; // Limpa qualquer resíduo

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

    // 3. Lógica para virar a carta selecionada
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

    // 4. Verificação lógica do par (Variáveis processando informações antes da tela)
    function verificarCombinacao() {
        const combinou = primeiraCarta.dataset.id === segundaCarta.dataset.id;

        if (combinou) {
            marcarComoResolvidas();
        } else {
            desvirarCartas();
        }
    }

    // 5. Ação quando o usuário acerta o par
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

    // 6. Oculta as cartas novamente se o usuário errar o par
    function desvirarCartas() {
        bloqueiaTabuleiro = true;

        setTimeout(() => {
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            primeiraCarta.textContent = "🔍 Identificar Fraude";
            segundaCarta.textContent = "🔍 Identificar Fraude";

            limparSelecao();
        }, 1500); // Exibe o erro por 1.5 segundos antes de desvirar
    }

    function limparSelecao() {
        primeiraCarta = null;
        segundaCarta = null;
        bloqueiaTabuleiro = false;
    }

    // 7. Evento de Acessibilidade - Modo Escuro
    if (botaoModoEscuro) {
        botaoModoEscuro.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // 8. Evento de Envio do Formulário Interativo
    if (formulario && containerFeedback) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            
            const nome = document.getElementById("nome-usuario").value;
            containerFeedback.textContent = `Agradecemos seu envio, ${nome}! Analisaremos o endereço informado para neutralizar o avanço desta desinformação.`;
            containerFeedback.classList.remove("escondido");
            
            formulario.reset();
        });
    }

    // Inicializa o jogo automaticamente ao abrir a página
    montarTabuleiro();
});
