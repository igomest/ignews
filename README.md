<h1 align="center">
  <img alt="Logo" src="./public/images/logo.svg" alt="ig.News">
</h1>

<h1 align="center">
    ig.News - Next.js
</h1>
<p align="center">Aplicação para inscrição de newsletter com pagamento via stripe</p>


<p align="center">
 <a href="#sobre-o-projeto">Sobre o Projeto</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#configurações-necessárias">Configurações necessárias</a> •
 <a href="#licença">Licença</a> •
 <a href="#autor">Autor</a>
</p>

## Sobre o projeto


O projeto tem como objetivo o estudo e desenvolvimento de uma aplicação em ReactJS com NextJS para listagem de posts e sistema de inscrição(subscription).

A aplicação foi desenvolvida utilizando o framework NextJS aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Site Generation (SSG), STRIPE para pagamentos das subscriptions, NextAuth para autenticação com Github, FaunaDB para armazenar as informações do usuário em um banco de dados e Prismic CMS para adição e gerenciamento do conteúdo dos posts.

---

## Tecnologias

Abaixo as tecnologias utilizadas para construção da aplicação

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Next-Auth](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

---

## Configurações necessárias

### **Requisitos**

Necessário realizar as instalações:

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

Criar conta e configurar os serviços externos:

- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

*Configurações dos serviços estão localizadas no arquivo servicesConfig.md na raiz do projeto.*

### **Clone do projeto**

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/nelsonsantosaraujo/ignews.git
# Entre na pasta do repositório clonado
$ cd ignews
```

### **Iniciando o projeto**

```bash/zsh
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Para iniciar a aplicação
$ yarn dev

```

## 🔖 Demo

Você pode visualizar o layout do projeto através [desse link](https://dtmoney-amber-sigma.vercel.app). 

#### Imagens
![ignews](https://user-images.githubusercontent.com/85263053/177010331-1bc01b08-3860-4f73-9259-e1fa7657fdcd.png)

---


## Autor

Feito por Ivan Gomes 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Ivan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/ivan-gomes-883820214/)](https://www.linkedin.com/in/ivan-gomes-883820214/)
[![Gmail Badge](https://img.shields.io/badge/-ivanjunior.pt@gmail.com-red?style=flat-square&link=mailto:ivanjunior.pt@gmail.com)](mailto:ivanjunior.pt@gmail.com)
