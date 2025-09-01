  document.getElementById("identificacaoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;

    if(nome.trim() !== "") {
      // Salva no localStorage para usar depois se quiser
      localStorage.setItem("nomeAluno", nome);
      // Redireciona para atividades
      window.location.href="atividadelogpg1.html";
    } else {
      alert("Por favor, insira seu nome.");
    }
  });