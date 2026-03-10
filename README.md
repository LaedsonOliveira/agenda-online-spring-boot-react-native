# 📅 Agenda online

Sistema de agendamento inteligente para pequenos negócios como barbearias, salões de beleza, manicures e clínicas estéticas.

O Agendamento online é uma aplicação que permite que clientes realizem agendamentos de serviços de forma rápida e organizada, enquanto os proprietários dos estabelecimentos conseguem gerenciar horários, serviços, profissionais e clientes em um único sistema.

O objetivo é substituir agendas físicas e anotações informais, oferecendo uma solução digital simples, acessível e eficiente para pequenos empreendedores.

## 🚀 Tecnologias Utilizadas

### Backend

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Maven
- PostgreSQL ou MySQL

### Mobile

- React Native
- Expo (opcional)
- Axios
- React Navigation

### Ferramentas

- Git
- GitHub
- Postman / Insomnia
- Docker (opcional)

## 🎯 Funcionalidades Principais

### 👤 Clientes

- Criar conta
- Visualizar serviços disponíveis
- Ver horários disponíveis
- Realizar agendamentos
- Cancelar ou remarcar agendamentos
- Receber confirmação do horário

### 💼 Estabelecimentos

- Cadastro de profissionais
- Cadastro de serviços
- Definição de horários de atendimento
- Visualização da agenda diária
- Gestão de clientes
- Histórico de atendimentos

### 📊 Administração

- Controle de agendamentos
- Relatórios básicos de atendimentos
- Gestão de horários disponíveis
- Controle de cancelamentos

## 📂 Estrutura do Projeto

### Backend (Spring Boot)

```
backend/
│
├── src/main/java/com/smartschedule
│
├── controllers/        # Endpoints da API
│
├── services/           # Regras de negócio
│
├── repositories/       # Comunicação com o banco
│
├── models/             # Entidades do sistema
│
├── dto/                # Objetos de transferência de dados
│
├── config/             # Configurações do projeto
│
└── SmartScheduleApplication.java
│
└── src/main/resources
│
└── application.properties
```

### Mobile (React Native)

```
mobile/
│
├── src/
│
├── screens/        # Telas do aplicativo
│
├── components/     # Componentes reutilizáveis
│
├── services/       # Comunicação com a API
│
├── navigation/     # Navegação entre telas
│
└── utils/
```

## 🧱 Arquitetura

O backend segue uma arquitetura em camadas, comum em aplicações Spring Boot.

- **Controller**
  - Recebe requisições HTTP
  - Retorna respostas da API
- **Service**
  - Contém as regras de negócio
  - Processa os dados antes de salvar ou retornar
- **Repository**
  - Responsável pela comunicação com o banco de dados
- **Model**
  - Representa as entidades do sistema

### Benefícios

- 📦 Separação de responsabilidades
- 🔧 Manutenção facilitada
- 🧪 Testabilidade
- 📈 Escalabilidade

## ⚙️ Pré-requisitos

Antes de iniciar o projeto, instale:

- Java 17+
- Maven
- Node.js 18+
- Expo CLI (opcional)
- PostgreSQL ou MySQL
- Git

## 🔧 Instalação

Clone o repositório:

```bash
git clone https://github.com/your-username/smart-schedule.git
```

Entre na pasta do projeto:

```bash
cd smart-schedule
```

## ▶️ Executando o Backend

Entre na pasta do backend:

```bash
cd backend
```

Execute o projeto:

```bash
mvn spring-boot:run
```

Ou compile:

```bash
mvn clean install
```

A API estará disponível em:

```
http://localhost:8080
```

## ▶️ Executando o Mobile

Entre na pasta mobile:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm start
```

ou

```bash
npx expo start
```

## 🔐 Variáveis de Ambiente

No backend, configure o arquivo:

`application.properties`

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/smartschedule
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 📡 Rotas da API

### 👤 Clientes

| Método | Rota            | Descrição         |
|--------|-----------------|-------------------|
| POST   | `/clients`      | Criar cliente     |
| GET    | `/clients`      | Listar clientes   |
| GET    | `/clients/{id}` | Buscar cliente    |
| PUT    | `/clients/{id}` | Atualizar cliente |
| DELETE | `/clients/{id}` | Remover cliente   |

### 💼 Serviços

| Método | Rota            | Descrição         |
|--------|-----------------|-------------------|
| POST   | `/services`     | Criar serviço     |
| GET    | `/services`     | Listar serviços   |
| PUT    | `/services/{id}`| Atualizar serviço |
| DELETE | `/services/{id}`| Remover serviço   |

### 📅 Agendamentos

| Método | Rota                | Descrição         |
|--------|---------------------|-------------------|
| POST   | `/appointments`     | Criar agendamento |
| GET    | `/appointments`     | Listar agendamentos|
| GET    | `/appointments/{id}`| Buscar agendamento|
| PUT    | `/appointments/{id}`| Remarcar          |
| DELETE | `/appointments/{id}`| Cancelar          |

## 🛠️ Melhorias Futuras

- Autenticação com JWT
- Notificações de agendamento
- Lembrete automático de horários
- Painel administrativo web
- Relatórios financeiros
- Integração com WhatsApp
- Sistema multiempresa (SaaS)

## 👨‍💻 Autor

Laedson Oliveira

📍 Belo Jardim - Brasil
💻 Estudante de Análise e Desenvolvimento de Sistemas

- [GitHub](https://github.com/LaedsonOliveira)
- [LinkedIn](https://www.linkedin.com/in/laedson-oliveira-dev/)

## 📜 Licença

Este projeto está sob a licença MIT.

Veja o arquivo LICENSE para mais detalhes.

Se quiser, também posso te ajudar a criar:

- Arquitetura ideal do banco (ERD)
- Modelagem das entidades JPA
- Primeiro MVP em 1 semana
- Estrutura SaaS multiempresa (tipo Trinks ou Booksy)