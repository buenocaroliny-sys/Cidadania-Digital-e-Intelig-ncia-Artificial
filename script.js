// Aguarda o DOM carregar completamente para evitar erros de execução
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Recurso 1: Alternador de Modo Escuro (Acessibilidade) ---
    const darkModeBtn = document.getElementById("toggle-dark-mode");
    
    darkModeBtn.addEventListener("click", () => {
        // Altera a classe no body para disparar as variáveis CSS modificadas
        document.body.classList.toggle("dark-mode");
    });

    // --- Recurso 2: Validador Dinâmico do Quiz de Desinformação ---
    const quizForm = document.getElementById("quiz-form");
    const feedbackDiv = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Impede o recarregamento padrão da página ao enviar o formulário
        event.preventDefault();

        // Captura a opção selecionada pelo usuário
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');
        
        // Valida se há uma resposta e processa a lógica de acerto/erro
        if (selectedOption) {
            const userAnswer = selectedOption.value;
            
            // Limpa as classes de feedback anteriores
            feedbackDiv.classList.remove("hidden", "correct", "incorrect");

            if (userAnswer === "falso") {
                // Manipulação dinâmica do DOM para resposta correta
                feedbackDiv.textContent = "Correto! As deepfakes representam um perigo real à sociedade, podendo fraudar identidades e espalhar mentiras em massa.";
                feedbackDiv.classList.add("correct");
            } else {
                // Manipulação dinâmica do DOM para resposta incorreta
                feedbackDiv.textContent = "Incorreto. Embora existam sátiras, o uso nocivo automatizado espalha pânico e mentiras perigosas.";
                feedbackDiv.classList.add("incorrect");
            }
        }
    });
});

