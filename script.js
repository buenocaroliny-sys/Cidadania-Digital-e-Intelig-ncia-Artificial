document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Lógica do Modo Escuro
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    
    btnDarkMode.addEventListener("click", () => {
        // Liga/Desliga a classe 'dark-theme' no body da página
        document.body.classList.toggle("dark-theme");
    });

    // 2. Lógica de Validação do Quiz
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        const answer = quizForm.elements["quiz-q1"].value;

        if (!answer) {
            quizResult.textContent = "⚠️ Escolha uma das opções primeiro!";
            quizResult.style.color = "orange";
            return;
        }

        if (answer === "correto") {
            quizResult.textContent = "🎉 Resposta Exata! Nunca repasse conteúdos suspeitos sem checar antes.";
            quizResult.style.color = "#2ecc71";
        } else {
            quizResult.textContent = "❌ Resposta Incorreta. Espalhar sem checar alimenta a rede de fake news.";
            quizResult.style.color = "#e74c3c";
        }
    });

    // 3. Lógica do Formulário de Alerta (Feedback Comunitário)
    const alertForm = document.getElementById("alert-form");
    const alertResult = document.getElementById("alert-result");

    alertForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userName = document.getElementById("user-name").value;
        
        alertResult.textContent = `✅ Obrigado, ${userName}! Link registrado e enviado para a moderação da comunidade escolar.`;
        alertResult.style.color = "#3498db";
        
        alertForm.reset(); // Limpa as caixas de texto
    });
});
