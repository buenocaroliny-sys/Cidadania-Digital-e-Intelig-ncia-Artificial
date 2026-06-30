// Dados do Jogo (Sinais de Alerta e Soluções correspondentes)
const dadosJogo = [
    { id: 1, alerta: "Piscadas de olhos não naturais ou ausentes.", solucao: "Observe atentamente os movimentos faciais e reflexos de luz nos olhos." },
    { id: 2, alerta: "Áudio com roboticidade ou dessincronizado.", solucao: "Verifique se a fala bate perfeitamente com o movimento dos lábios." },
    { id: 3, alerta: "Bordas da face borradas ou sombras estranhas.", solucao: "Analise o contorno do rosto e falhas em cortes de transição de vídeo." },
    { id: 4, alerta: "Inconsistências no fundo do cenário.", solucao: "Repare se objetos se movem ou entortam magicamente atrás da pessoa." }
];

let itemAlertaSelecionado = null;
let itemSolucaoSelecionada = null;
let acertos = 0;

// Inicializar Elementos na Tela
function iniciarJogo() {
    const colAlertas = document.getElementById("coluna-alertas");
    const colSolucoes = document.getElementById("coluna-solucoes");

    // Embaralhar as colunas para o jogo não ficar na ordem direta
    const alertasEmbaralhados = [...dadosJogo].sort(() => Math.random() - 0.5);
    const solucoesEmbaralhadas = [...dadosJogo].sort(() => Math.random() - 0.5);

    alertasEmbaralhados.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-jogo";
        div.innerText = item.alerta;
        div.dataset.id = item.id;
        div.onclick = () => selecionarAlerta(div);
        colAlertas.appendChild(div);
    });

    solucoesEmbaralhadas.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-jogo";
        div.innerText = item.solucao;
        div.dataset.id = item.id;
        div.onclick = () => selecionarSolucao(div);
        colSolucoes.appendChild(div);
    });
}

function selecionarAlerta(elemento) {
    if (elemento.classList.contains("correto")) return;
    document.querySelectorAll("#coluna-alertas .item-jogo").forEach(el => el.classList.remove("selecionado"));
    elemento.classList.add("selecionado");
    itemAlertaSelecionado = elemento;
    verificarCombinacao();
}

function selecionarSolucao(elemento) {
    if (elemento.classList.contains("correto")) return;
    document.querySelectorAll("#coluna-solucoes .item-jogo").forEach(el => el.classList.remove("selecionado"));
    elemento.classList.add("selecionado");
    itemSolucaoSelecionada = elemento;
    verificarCombinacao();
}

function verificarCombinacao() {
    if (itemAlertaSelecionado && itemSolucaoSelecionada) {
        if (itemAlertaSelecionado.dataset.id === itemSolucaoSelecionada.dataset.id) {
            // Se acertou o par
            itemAlertaSelecionado.classList.remove("selecionado");
            itemSolucaoSelecionada.classList.remove("selecionado");
            itemAlertaSelecionado.classList.add("correto");
            itemSolucaoSelecionada.classList.add("correto");
            acertos++;
            document.getElementById("pontos").innerText = acertos;
        } else {
            // Se errou, remove o destaque visual após breve tempo
            const a = itemAlertaSelecionado;
            const s = itemSolucaoSelecionada;
            setTimeout(() => {
                a.classList.remove("selecionado");
                s.classList.remove("selecionado");
            }, 500);
        }
        itemAlertaSelecionado = null;
        itemSolucaoSelecionada = null;
    }
}

// Controle do Modo Escuro
const btnEscuro = document.getElementById("btn-escuro");
btnEscuro.addEventListener("click", () => {
    const temaAtual = document.documentElement.getAttribute("data-theme");
    if (temaAtual === "dark") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
});

// Envio do Formulário
document.getElementById("form-alerta").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const link = document.getElementById("link").value;
    alert(`Obrigado ${nome}! O link para a mídia suspeita foi enviado com sucesso.`);
    document.getElementById("form-alerta").reset();
});

// Rodar o jogo ao carregar a página
window.onload = iniciarJogo;
