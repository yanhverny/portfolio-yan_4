# Portfólio — Yan

Site pessoal estático (HTML5 + CSS3 + JavaScript puro, sem frameworks),
feito para a Atividade Prática de Fundamentos da Programação Web.

## Estrutura

```
portfolio/
├── index.html              → página única com as 4 seções (âncoras)
├── assets/
│   ├── css/style.css       → estilos, tema claro/escuro, responsividade
│   └── js/script.js        → tema, menu mobile, seção ativa, validação do form
└── README.md
```

## Antes de publicar — pontos para revisar

1. **Foto e texto de "Sobre mim"**: complete o último parágrafo com mais
   detalhes pessoais, se quiser.
2. **Links do Portfólio** (seção `#portfolio`): há três cartões com
   comentários `<!-- TODO -->` no `index.html` — troque os `href="#"`
   pelos links reais dos projetos (Massas Garrido, card do Cartola FC etc.).
3. **Contato**: no `index.html`, troque o e-mail de exemplo e os links
   de LinkedIn/GitHub pelos seus.
4. **Nome do endereço do site**: o enunciado pede que a URL contenha seu
   nome (ex: `https://seu-usuario.github.io/portfolio-yan/`).

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub (ex: `portfolio-yan`).
2. Envie os arquivos deste projeto para o repositório (mantendo a
   estrutura de pastas `assets/`).
3. Vá em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
4. Aguarde alguns minutos: o site ficará disponível em
   `https://seu-usuario.github.io/nome-do-repositorio/`.
5. Teste o link publicado (não use `localhost` ou `127.0.0.1` nos prints
   que forem entregues no documento final).

## Funcionalidades implementadas

- Navegação por âncoras com menu fixo, igual em todas as seções.
- Menu responsivo com botão hamburguer no mobile.
- Alternância de tema claro/escuro, salva no navegador.
- Validação do formulário de contato (campos obrigatórios + formato de e-mail).
- Simulação de envio: limpa o formulário e exibe mensagem de sucesso.
- Destaque automático do link do menu conforme a seção visível na tela.
