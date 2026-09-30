# ♻ Recicla Mais

Projeto acadêmico de um site institucional sobre reciclagem desenvolvido com foco em **acessibilidade digital e WCAG 2.1**.

O objetivo é demonstrar que acessibilidade pode ser incorporada desde a estrutura HTML, passando por CSS e JavaScript, até os testes manuais com teclado e tecnologias assistivas.

---

## 1. Objetivo do projeto

O Recicla Mais apresenta informações educativas sobre reciclagem de forma simples, responsiva e acessível.

O projeto contempla:

- estrutura HTML semântica;
- navegação por teclado;
- suporte a leitores de tela;
- foco visível;
- skip link;
- formulário acessível;
- mensagens de erro associadas aos campos;
- componentes interativos com estados acessíveis;
- responsividade;
- suporte a `prefers-reduced-motion`;
- contraste adequado entre texto e fundo;
- documentação de acessibilidade;
- fluxo de desenvolvimento baseado em GitFlow.

---

## 2. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Git
- GitHub
- GitFlow
- NVDA para testes manuais
- Lighthouse para auditoria

O projeto não utiliza frameworks, permitindo demonstrar diretamente os recursos nativos da Web.

---

## 3. Estrutura de diretórios

```text
recicla-mais/
├── index.html
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── navigation.js
│   ├── materials.js
│   ├── form.js
│   └── main.js
├── docs/
│   └── acessibilidade.html
└── README.md
```

### Responsabilidade dos arquivos JavaScript

**navigation.js**
- abertura e fechamento do menu mobile;
- atualização de `aria-expanded`;
- suporte à tecla `Escape`;
- fechamento após seleção de um link.

**materials.js**
- filtros dos materiais;
- atualização de `aria-pressed`;

**form.js**
- validação dos campos;
- `aria-invalid`;
- mensagens de erro;
- foco no primeiro campo inválido;
- mensagem de sucesso acessível.

**main.js**
- inicialização geral do projeto.

---

# 4. Acessibilidade e WCAG 2.1

## 4.1 Perceptível

### Estrutura semântica

A página utiliza elementos HTML de acordo com sua finalidade:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Os títulos seguem uma hierarquia lógica:

```text
h1
├── h2
│   ├── h3
│   └── h3
└── h2
    ├── h3
    └── h3
```

### Contraste

As combinações de cores foram escolhidas para fornecer contraste adequado entre texto e fundo.

O contraste deve ser validado novamente com uma ferramenta automatizada ou de análise de contraste durante a entrega.

### Não depender apenas de cor

Estados importantes não dependem exclusivamente de cores. O filtro utiliza texto, borda, estado visual e o atributo:

```html
aria-pressed="true"
```

### Texto alternativo

Elementos puramente decorativos utilizam:

```html
aria-hidden="true"
```

Quando imagens informativas forem adicionadas ao projeto, devem receber `alt` descritivo.

---

# 5. Operável

## Navegação por teclado

Todos os controles principais são elementos nativos:

```html
<a>
<button>
<input>
<textarea>
<summary>
```

Isso permite utilizar o teclado sem depender de eventos de mouse.

### Teclas testadas

| Tecla | Função |
|---|---|
| Tab | Avança o foco |
| Shift + Tab | Retorna o foco |
| Enter | Ativa links e controles |
| Espaço | Ativa botões |
| Esc | Fecha o menu mobile |

### Skip link

O primeiro elemento da página é:

```html
<a class="skip-link" href="#conteudo">
  Pular para o conteúdo principal
</a>
```

Isso permite que usuários de teclado e leitores de tela pulem diretamente para o conteúdo.

### Foco visível

O projeto possui uma regra global:

```css
:focus-visible {
  outline: 3px solid #e0a900;
  outline-offset: 3px;
}
```

---

# 6. Leitores de tela

O projeto foi estruturado para uso com tecnologias assistivas.

Foram considerados:

- NVDA;
- navegação por landmarks;
- leitura de títulos;
- identificação de links;
- identificação de botões;
- formulários com labels;
- mensagens dinâmicas.

## ARIA

ARIA é utilizada apenas quando adiciona informação necessária ao componente.

Exemplos:

```html
aria-label="Navegação principal"
aria-expanded="false"
aria-controls="menu-principal"
aria-pressed="true"
aria-live="polite"
aria-invalid="true"
aria-describedby="name-help name-error"
```

O HTML semântico continua sendo a primeira escolha.

---

# 7. Formulário acessível

Todos os campos possuem `label` associado:

```html
<label for="email">E-mail</label>
<input id="email" name="email" type="email">
```

Os erros são relacionados ao campo através de:

```html
aria-describedby="email-help email-error"
```

Quando existe erro:

```html
aria-invalid="true"
```

Após uma tentativa de envio inválida, o foco é direcionado ao primeiro campo com erro.

A mensagem final utiliza:

```html
aria-live="polite"
```

para permitir que a tecnologia assistiva anuncie a alteração.

---

# 8. Conteúdo dinâmico

O filtro de materiais possui botões com estado acessível:

```html
<button aria-pressed="true">
```

Quando o filtro é alterado, uma região de anúncio informa o resultado:

```html
<p id="filter-status" aria-live="polite"></p>
```

Dessa forma, o usuário não precisa depender apenas da alteração visual da lista.

---

# 9. Responsividade

O projeto utiliza CSS responsivo com abordagem mobile-first.

Breakpoints principais:

```text
520px
760px
900px
```

O layout adapta:

- navegação;
- cards;
- formulário;
- grids;
- botões;
- rodapé;
- espaçamentos.

Também existe suporte à preferência do usuário por redução de movimento:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

# 10. GitFlow

O desenvolvimento deve utilizar a seguinte estrutura:

```text
main
  │
  └── develop
       ├── feature/header-navigation
       ├── feature/home
       ├── feature/materials
       ├── feature/accessibility
       ├── feature/contact-form
       └── feature/responsive-layout
```

## Branches principais

### main

Contém versões estáveis do projeto.

### develop

Integra as funcionalidades que serão posteriormente preparadas para uma versão estável.

### feature/*

Utilizadas para desenvolver funcionalidades isoladas.

---

## Exemplo de fluxo

Criar a branch de desenvolvimento:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/accessibility
```

Implementar as alterações:

```bash
git add .
git commit -m "feat: implement keyboard accessibility"
```

Enviar para o GitHub:

```bash
git push -u origin feature/accessibility
```

Depois disso, abrir um Pull Request:

```text
feature/accessibility
        ↓
     develop
```

Quando uma versão estiver pronta:

```text
develop
   ↓
release/1.0.0
   ↓
main
```

Após a publicação:

```text
main
 ↓
tag v1.0.0
```

---

# 11. Padrão de commits

Foi adotado o padrão de Conventional Commits.

Exemplos:

```text
feat: add recycling materials section
feat: implement accessible navigation
fix: correct form validation message
style: improve responsive layout
docs: add accessibility documentation
refactor: separate material filtering logic
test: validate keyboard navigation
```

Tipos utilizados:

- `feat` - nova funcionalidade
- `fix` - correção
- `style` - alterações visuais
- `docs` - documentação
- `refactor` - refatoração
- `test` - testes

---

# 12. Checklist de testes

## Teclado

- [x] É possível chegar a todos os links usando Tab?
- [x] É possível retornar usando Shift + Tab?
- [x] O foco permanece sempre visível?
- [x] Os botões funcionam com Enter/Espaço?
- [x] O menu mobile funciona sem mouse?
- [x] A tecla Esc fecha o menu?
- [x] O usuário consegue pular para o conteúdo?
- [x] Não existe armadilha de foco?

## Leitor de tela

- [x] O idioma `pt-BR` é identificado?
- [x] O título da página é anunciado corretamente?
- [x] Os landmarks são identificáveis?
- [x] A hierarquia de títulos faz sentido?
- [x] Os links possuem nomes compreensíveis?
- [x] Os botões possuem nomes compreensíveis?
- [x] Os campos possuem labels?
- [x] Os erros são anunciados?
- [x] As alterações do filtro são comunicadas?

## Visual

- [x] Contraste validado?
- [x] Conteúdo não depende apenas de cor?
- [x] Foco visível?
- [x] Layout funciona em telas pequenas?
- [x] Conteúdo continua utilizável com zoom?
- [x] Texto permanece legível?

## Ferramentas

- [x] Lighthouse
- [x] NVDA
- [x] Navegação somente com teclado

---

# 13. Como executar

Não é necessário instalar dependências.

Basta abrir:

```text
index.html
```

Para uma experiência mais próxima de um ambiente de desenvolvimento, pode ser utilizado o Live Server do VS Code.

---

# 14. Critérios de acessibilidade relacionados à WCAG 2.1

O projeto considera principalmente:

| Critério | Aplicação |
|---|---|
| 1.1.1 Conteúdo não textual | tratamento de elementos decorativos e textos alternativos |
| 1.3.1 Informações e relações | HTML semântico e hierarquia |
| 1.3.2 Sequência significativa | ordem lógica do DOM |
| 1.4.3 Contraste | cores de texto e fundo |
| 1.4.10 Reflow | layout responsivo |
| 1.4.11 Contraste não textual | bordas e controles |
| 2.1.1 Teclado | interação sem mouse |
| 2.1.2 Sem bloqueio de teclado | ausência de armadilhas de foco |
| 2.4.1 Ignorar blocos | skip link |
| 2.4.3 Ordem do foco | ordem lógica no DOM |
| 2.4.7 Foco visível | `:focus-visible` |
| 2.4.11 Foco não obscurecido | cuidado com cabeçalho fixo |
| 3.1.1 Idioma da página | `lang="pt-BR"` |
| 3.3.1 Identificação de erros | mensagens nos campos |
| 3.3.2 Rótulos ou instruções | labels e textos de ajuda |
| 4.1.2 Nome, função e valor | controles nativos e ARIA |

---

# 15. Conclusão

O Recicla Mais demonstra uma abordagem de desenvolvimento que considera acessibilidade como parte da implementação e não apenas como uma etapa visual.

A combinação de HTML semântico, CSS responsivo, JavaScript progressivo, navegação por teclado, foco visível, mensagens acessíveis e testes com tecnologias assistivas permite construir uma experiência mais inclusiva.