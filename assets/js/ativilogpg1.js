let bloquearSair = true; 

  window.addEventListener("beforeunload", function (e) {
    if (bloquearSair) {
      e.preventDefault();
      e.returnValue = ""; 
    }
  });

  document.addEventListener("visibilitychange", function() {
    if (document.hidden && bloquearSair) {
      alert("Você não pode deixar a aba do exercício!");
    }
  });

  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    alert("Clique direito desativado!");
  });
  document.addEventListener("copy", function(e) {
    e.preventDefault();
    alert("Copiar desativado!");
  });

  const nome = localStorage.getItem("nomeAluno");
  if (nome) {
    document.getElementById("alunoNome").innerText = nome;
  }

  emailjs.init("a5E9mFBX9e9HZrHi9"); 

  function enviarEmail(nome, titulo, respostas, dataHora) {
    return emailjs.send("service_codestart", "atividade_template", {
      nome_aluno: nome,
      titulo_atividade: titulo,
      respostas: respostas,
      data_hora: dataHora  
    });
  }

  document.getElementById("formAtividade").addEventListener("submit", function(e) {
    e.preventDefault();

   const respostas = {
  "Questão 1 - Se A é verdadeiro e B é falso, qual é o resultado de A AND B?": "A resposta do aluno foi: " + this.q1.value,
  "Questão 2 - Qual é o próximo número da sequência: 2, 4, 8, 16, ... ?": "A resposta do aluno foi: " + this.q2.value,
  "Questão 3 - Complete a tabela verdade para a proposição: (A OR B) AND C": "A resposta do aluno foi: " + this.q3.value
};

let respostasTexto = "";
for (let pergunta in respostas) {
  respostasTexto += `${pergunta}\n${respostas[pergunta]}\n\n`;
}

    const titulo = "Lógica de Programação - Atividade 1";
    const respostasFormatadas = JSON.stringify(respostas, null, 2);

    const agora = new Date();
    const dataHora = agora.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium"
    });

    sessionStorage.setItem("atividade_titulo", titulo);
    sessionStorage.setItem("atividade_respostas", respostasFormatadas);
    sessionStorage.setItem("atividade_dataHora", dataHora);

    bloquearSair = false;

    const nomeAluno = localStorage.getItem("nomeAluno") || "Aluno não identificado";

    enviarEmail(nomeAluno, titulo, respostasFormatadas, dataHora)
      .then(function(response) {
        console.log('E-mail enviado com sucesso!', response.status, response.text);
        window.location.href = "atividadeconf.html";
      })
      .catch(function(error) {
        console.error('Erro ao enviar e-mail:', error);
        alert("Erro ao enviar e-mail. Verifique sua conexão ou tente novamente.");
      });
  });
