# Desafio Técnico Frontend - Sistema de Carrinho de Compras

## Visão Geral

Bem-vindo ao meu projeto de desafio técnico frontend, onde desenvolvi uma interface de usuário envolvente e dinâmica para um sofisticado Sistema de Carrinho de Compras. Através do uso da poderosa combinação do Next.js e da eficiente biblioteca React Query, consegui criar uma experiência fluida e responsiva para os usuários.

### Funcionalidades Destacadas

- **Exploração Facilitada:** Os usuários podem explorar a extensa lista de produtos disponíveis para compra, apresentados de forma atraente com nomes, preços e imagens.

- **Interação Intuitiva:** Através de uma interação intuitiva, os usuários podem adicionar produtos ao carrinho de compras sem esforço, proporcionando uma experiência de compra perfeita.

- **Transparência Total:** O conteúdo do carrinho de compras é exibido de maneira clara e concisa, com a lista detalhada de produtos, quantidades e subtotais individuais para cada item.

- **Controle Total:** Ofereço aos usuários a capacidade de ajustar a quantidade de produtos no carrinho e até mesmo remover itens individualmente, proporcionando controle total sobre sua seleção.

- **Visão Abrangente:** Exibo o valor total da compra no carrinho para que os usuários tenham uma visão abrangente dos custos antes de prosseguir.

- **Finalização Conveniente:** Um passo crucial é a opção de finalizar a compra, permitindo que os usuários enviem os detalhes do carrinho para o backend, dando continuidade ao processo.

### Tecnologias Utilizadas

- **Next.js:** Escolhi o Next.js para aproveitar ao máximo o ambiente de desenvolvimento React, proporcionando carregamento rápido de páginas e recursos como Server-Side Rendering (SSR) e Static Site Generation (SSG).

- **React Query:** Utilizei a biblioteca React Query para gerenciamento de estado e cache, o que resultou em uma interface responsiva e altamente eficiente.

- **Tailwind CSS:** Desenvolvi um layout responsivo e estilizado utilizando o Tailwind CSS, garantindo uma aparência moderna e agradável.

### Integração Perfeita

Integrei harmoniosamente o frontend ao backend, que também desenvolvi como parte deste desafio. O backend está disponível no repositório [https://github.com/afonsocardz/ecommerce-backend](https://github.com/afonsocardz/ecommerce-backend). Com essa integração, garanto que os dados do carrinho de compras sejam seguros e confiáveis.

### Segurança e Experiência do Usuário

Para priorizar a segurança dos dados do carrinho de compras, adotei medidas rigorosas, incluindo o uso de tokens com http-only e requisições otimistas para remoção e atualização de produtos. Além disso, ofereci uma experiência excepcional ao usuário, com pesquisa de produtos, autenticação, paginação e notificações no processo de finalização de compra.

### Instruções para Rodar o Projeto

Siga estas etapas simples para executar o projeto em seu ambiente local:

1. Certifique-se de ter o Node.js instalado em sua máquina.

2. Clone este repositório em sua máquina local:

```bash
git clone https://github.com/afonsocardz/ecommerce-frontend
```

3. Navegue até o diretório do projeto:

```bash
cd ecommerce-frontend
```

4. Instale as dependências do projeto:

```bash
npm install
```

5. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```plaintext
NEXT_PUBLIC_API_URL=https://ecommerce-back-bg2q.onrender.com/api
```

Certifique-se de substituir `https://caminho-para-sua-api.com` pela URL real da sua API de backend.

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

7. Acesse a interface do usuário em seu navegador em [http://localhost:3000](http://localhost:3000).

**Candidato: [Afonso Cardozo Cruz]**  
**Contato: [afonso.desenvolvimento@gmail.com] | [15 99164-2276]**
