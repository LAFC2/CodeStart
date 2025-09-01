function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function formatRespostas(obj) {
  if (!obj) return 'Nenhuma resposta encontrada.';
  try {
    if (typeof obj === 'string') {
      if ((obj.trim().startsWith('{') || obj.trim().startsWith('['))) {
        obj = JSON.parse(obj);
      } else {
        return obj;
      }
    }
    if (Array.isArray(obj)) {
      return obj.map((v,i)=>`${i+1}. ${v}`).join('\n');
    } else if (typeof obj === 'object') {
      return Object.entries(obj).map(([k,v]) => `${k}: ${v}`).join('\n\n');
    } else {
      return String(obj);
    }
  } catch (e) {
    return String(obj);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const nome = localStorage.getItem("nomeAluno") || "Não identificado";

  const titulo = sessionStorage.getItem('atividade_titulo') || getQueryParam('title') || 'Atividade';
  const rawRespostas = sessionStorage.getItem('atividade_respostas') || localStorage.getItem('atividade_respostas') || getQueryParam('answers');
  const dataEnvio = new Date().toLocaleString('pt-BR');

  document.getElementById('nomeAluno').textContent = nome;
  document.getElementById('tituloAtividade').textContent = titulo;
  document.getElementById('dataEnvio').textContent = dataEnvio;

  const respostasFormatadas = formatRespostas(rawRespostas);
  document.getElementById('respostasPre').textContent = respostasFormatadas;

  const btnToggle = document.getElementById('btnToggleRespostas');
  const respostasBox = document.getElementById('respostasBox');
  btnToggle.addEventListener('click', () => {
    respostasBox.style.display = (respostasBox.style.display === 'none') ? 'block' : 'none';
    btnToggle.innerHTML = (respostasBox.style.display === 'none')
      ? '<i class="bi bi-eye me-1"></i> Ver minhas respostas'
      : '<i class="bi bi-eye-slash me-1"></i> Ocultar respostas';
  });

  document.getElementById('btnDownload').addEventListener('click', () => {
    const blobLines = [];
    blobLines.push('Comprovante de envio — CodeStart');
    blobLines.push('-------------------------------');
    blobLines.push('Nome: ' + nome);
    blobLines.push('Atividade: ' + titulo);
    blobLines.push('Data/Hora: ' + dataEnvio);
    blobLines.push('');
    blobLines.push('Respostas:');
    blobLines.push(respostasFormatadas);

    const blob = new Blob([blobLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = titulo.replace(/\s+/g, '_').replace(/[^a-z0-9_\-]/gi,'');
    a.download = `comprovante_${safeTitle}_${(new Date()).getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});
