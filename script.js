function abrirPopup() {
  const campo = document.getElementById("codigo");
  const mensagem = document.getElementById("mensagem");
  const codigo = campo.value.trim();
  mensagem.textContent = "";

  if (!codigo) {
    mensagem.textContent = "Por favor, digite um código de rastreio.";
    mensagem.style.color = "#a60000";
    return false;
  }

  const padraoCorreios = /^[A-Z]{2}\d{9}[A-Z]{2}$/i;
  const padraoMandae = /^\d{9}$/;

  let url = "";
  let isMandae = false;

  if (padraoCorreios.test(codigo)) {
    url = "https://www.linkcorreios.com.br/?id=" + encodeURIComponent(codigo);
    mensagem.textContent = "Redirecionando para o rastreio dos Correios...";
    mensagem.style.color = "#007500";
  } else if (padraoMandae.test(codigo)) {
    url = "https://rastreae.com.br/busca";
    isMandae = true;

    navigator.clipboard.writeText(codigo).then(() => {
      mensagem.textContent = "Código da Mandaê copiado! Cole na próxima página.";
      mensagem.style.color = "#007500";
    }).catch(() => {
      mensagem.textContent = "Copie e cole manualmente o código: " + codigo;
      mensagem.style.color = "#a60000";
    });
  } else {
    mensagem.textContent = "Código inválido! Verifique o formato.";
    mensagem.style.color = "#a60000";
    return false;
  }

  const largura = 650;
  const altura = 650;
  const esquerda = (screen.width - largura) / 2;
  const topo = (screen.height - altura) / 3;

  setTimeout(() => {
    window.open(
      url,
      "_blank",
      `width=${largura},height=${altura},top=${topo},left=${esquerda},
      toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no`
    );
  }, isMandae ? 300 : 0);

  return false;
}