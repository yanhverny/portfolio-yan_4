/* =========================================================
   script.js
   Funcionalidades:
   1) Alternância de tema claro/escuro (com persistência)
   2) Menu responsivo (abrir/fechar no mobile)
   3) Destaque do link ativo conforme a seção visível
   4) Validação e simulação de envio do formulário de contato
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1) TEMA CLARO / ESCURO
     Usa localStorage para lembrar a escolha do usuário entre
     visitas. Se não houver escolha salva, respeita a
     preferência do sistema operacional.
  --------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'portfolio-theme';

  function aplicarTema(tema) {
    root.setAttribute('data-theme', tema);
    localStorage.setItem(THEME_KEY, tema);
  }

  const temaSalvo = localStorage.getItem(THEME_KEY);
  const prefereClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
  aplicarTema(temaSalvo || (prefereClaro ? 'light' : 'dark'));

  themeToggle.addEventListener('click', () => {
    const temaAtual = root.getAttribute('data-theme');
    aplicarTema(temaAtual === 'light' ? 'dark' : 'light');
  });

  /* ---------------------------------------------------------
     2) MENU RESPONSIVO (mobile)
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  navToggle.addEventListener('click', () => {
    const aberto = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(aberto));
  });

  // Fecha o menu ao clicar em um link (útil no mobile)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     3) DESTAQUE DA SEÇÃO ATIVA NO MENU + ANIMAÇÃO DE ENTRADA
     Usa IntersectionObserver para saber qual seção está
     visível na tela e marcar o link correspondente.
  --------------------------------------------------------- */
  const secoes = document.querySelectorAll('.ticket');
  const links = document.querySelectorAll('.ticket-link');

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      const id = entrada.target.getAttribute('id');
      const linkCorrespondente = document.querySelector(`.ticket-link[href="#${id}"]`);

      if (entrada.isIntersecting) {
        // Anima a entrada da seção (efeito sutil de fade + subida)
        entrada.target.classList.add('is-visible');

        links.forEach(l => l.classList.remove('is-active'));
        if (linkCorrespondente) linkCorrespondente.classList.add('is-active');
      }
    });
  }, { threshold: 0.35 });

  secoes.forEach(secao => observer.observe(secao));

  /* ---------------------------------------------------------
     4) VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO
  --------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const campos = {
    nome: { input: document.getElementById('nome'), erro: document.getElementById('erroNome') },
    email: { input: document.getElementById('email'), erro: document.getElementById('erroEmail') },
    mensagem: { input: document.getElementById('mensagem'), erro: document.getElementById('erroMensagem') },
  };

  // Regex simples para validar formato "usuario@dominio.com"
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validarCampo(chave) {
    const { input, erro } = campos[chave];
    const valor = input.value.trim();
    input.dataset.touched = 'true';

    if (valor === '') {
      erro.textContent = 'Este campo é obrigatório.';
      return false;
    }

    if (chave === 'email' && !REGEX_EMAIL.test(valor)) {
      erro.textContent = 'Informe um e-mail válido (ex: usuario@dominio.com).';
      return false;
    }

    erro.textContent = '';
    return true;
  }

  // Valida cada campo assim que o usuário sai dele
  Object.keys(campos).forEach(chave => {
    campos[chave].input.addEventListener('blur', () => validarCampo(chave));
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nomeValido = validarCampo('nome');
    const emailValido = validarCampo('email');
    const mensagemValida = validarCampo('mensagem');

    if (!nomeValido || !emailValido || !mensagemValida) {
      status.style.color = '#e07a73';
      status.textContent = 'Verifique os campos destacados antes de enviar.';
      return;
    }

    // Simulação do envio: como não há backend, apenas limpamos o
    // formulário e exibimos uma mensagem de confirmação.
    const nomeDigitado = campos.nome.input.value.trim();
    form.reset();
    Object.values(campos).forEach(campo => {
      campo.input.dataset.touched = 'false';
    });

    status.style.color = '';
    status.textContent = `Chamado CT-04 registrado com sucesso! Obrigado, ${nomeDigitado}, retornarei em breve.`;
  });

  /* ---------------------------------------------------------
     Ano atual no rodapé
  --------------------------------------------------------- */
  document.getElementById('ano').textContent = new Date().getFullYear();
});
