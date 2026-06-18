/**
 * Script do Portal de Cidadania Digital 2026
 * Funcionalidades: Validador de Quiz e Modo Escuro (Acessibilidade)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ====================================
    // FUNDAÇÃO: SELEÇÃO DE ELEMENTOS DO DOM
    // ====================================
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    // ====================================
    // RECIPROCIDADE: BOTÃO MODO ESCURO
    // ====================================
    toggleDarkModeButton.addEventListener("click", () => {
        // Alterna a classe no body do HTML
        document.body.classList.toggle("dark-mode");
    });

    // ====================================
    // LÓGICA E PROCESSAMENTO: VALIDAÇÃO DO QUIZ
    // ====================================
    quizForm.addEventListener("submit", (event) => {
        // Impede o recarregamento automático da página
        event.preventDefault();

        // Captura e armazena as variáveis de resposta do usuário
        const respostaQuestao1 = document.getElementById("q1").value;
        const respostaQuestao2 = document.getElementById("q2").value;

        // Variável de controle de acertos
        let acertos = 0;

        // Processa os dados antes de exibir na tela
        if (respostaQuestao1 === "correto") {
            acertos++;
        }
        if (respostaQuestao2 === "correto") {
            acertos++;
        }

        // Exibe o resultado dinamicamente alterando classes e textos do DOM
        quizResult.classList.remove("hidden", "success", "error");

        if (acertos === 2) {
            quizResult.textContent = `Parabéns! Você acertou todas as questões (${acertos}/2). Você sabe se proteger contra a desinformação!`;
            quizResult.classList.add("success");
        } else {
            quizResult.textContent = `Você acertou ${acertos} de 2 questões. Revise o guia acima para identificar deepfakes de forma mais eficiente!`;
            quizResult.classList.add("error");
        }
    });
});
