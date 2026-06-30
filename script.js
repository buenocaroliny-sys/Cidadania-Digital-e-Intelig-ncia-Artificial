// Aguarda o carregamento completo do documento HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Funcionalidade 1: Modo Escuro (Acessibilidade) ---
    const toggleButton = document.getElementById("toggle-dark-mode");
    
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    // --- Funcionalidade 2: Validador do Quiz Anti-Desinformação ---
    const quizForm = document.getElementById("quiz-form");
    const resultDisplay = document.getElementById("quiz-result");

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o recarregamento da página ao enviar
        
        // Captura a opção selecionada pelo usuário
        const selectedOption = quizForm.elements["q1"].value;

        if (!selectedOption) {
            resultDisplay.textContent = "Por favor, selecione uma resposta antes de enviar.";
            resultDisplay.style.color = "orange";
            return;
        }

        if (selectedOption === "correta") {
            resultDisplay.textContent = "Parabéns! Você acertou. Checar fontes é a melhor arma contra fake news.";
            resultDisplay.style.color = "green";
        } else {
            resultDisplay.textContent = "Resposta incorreta. Compartilhar sem checar espalha a desinformação.";
            resultDisplay.style.color = "red";
        }
    });
});
