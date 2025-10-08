<div align="center" class="">
  <img alt="fincheck" title="portfolio" src="https://raw.githubusercontent.com/Micalli/credifit/ebdf165f04c7480deb358967406ba8c463ea7146/front/src/assets/logo.svg" width="300px">
</div>

Um sistema  de crédito consignado desenvolvido com NestJS (backend) e React (frontend), projetado para oferecer uma experiência moderna.

## 🎯 Visão Geral

O Credifit é uma aplicação de rédito consignado, completa que demonstra as melhores práticas de desenvolvimento full-stack. O projeto inclui:

- **Backend**: API RESTful construída com NestJS, Prisma ORM
- **Frontend**: Interface moderna desenvolvida com React, TypeScript e Tailwind CSS
- **Banco de dados**: Postgres
- **Autenticação**: Sistema de autenticação JWT 
- **Funcionalidades**: Cadastro de funcionarios, empresas e pedido de crédito consignado


## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS**: Framework Node.js para construção de aplicações escaláveis
- **Prisma**: ORM moderno para TypeScript e Node.js 
- **JWT**: Autenticação baseada em tokens
- **bcryptjs**: Criptografia de senhas
- **class-validator**: Validação de dados

### Frontend
- **React 19**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **React Router**: Roteamento da aplicação
- **React Query**: Gerenciamento de estado do servidor (Escolhi por ter uma intimidade com a lib e praticidade de gerenciamento de estado)
- **Lucide React**: Ícones
- **React Hook Form**: Formulários
- **Zod**: Validação de esquemas


## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Backend

1. **Instalar dependências:**
```bash
cd api
npm install
```

2. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na pasta `api/`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/credifit"
JWT_SECRET="your-jwt-secret"
```

3. Rodando PostgreSQL com Docker
```bash
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

Em seguida dê esses comandos para criar a tabela dentro do container
```bash
#Entra no bash do container
docker exec -it pg bash

#Entra no postgres
psql -U root

#Cria o banco
CREATE DATABASE nomeDoBanco;
```

4. **Executar a aplicação:**
```bash
npm run start:dev
```

### Frontend

1. **Instalar dependências:**
```bash
cd front
npm install
```

2. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na pasta `front/`:
```env
VITE_API_URLL="http://localhost:3000"
```

3. **Executar a aplicação:**
```bash
npm run dev
```


## Entre em contato
Feito por [Bruno Micalli](https://github.com/micalli).

[![Linkedin Badge](https://img.shields.io/badge/-Bruno_Micalli-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunomicalli/)](https://www.linkedin.com/in/brunomicalli/)
