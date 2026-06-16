# Mapeamento das alterações realizadas

## Backend

### 1. Modelos e entidades
- `model/Proprietario.java`
- `model/Estabelecimento.java`
- `model/Barbeiro.java`
- `model/Cliente.java`
- `model/Servico.java`
- `model/BarbeiroServico.java`
- `model/Agendamento.java`
- `model/Notificacao.java`
- `model/HorarioDisponivel.java`
- `model/BloqueioAgenda.java`

### 2. Enums
- `model/enuns/StatusOperacional.java`
- `model/enuns/TipoNegocio.java`
- `model/enuns/AgendamentoStatus.java`
- `model/enuns/OrigemAgendamento.java`
- `model/enuns/BloqueioTipo.java`
- `model/enuns/DiaSemana.java`

### 3. Repositórios
- `repository/EstabelecimentoRepository.java`
- `repository/ClienteRepository.java`
- `repository/ProprietarioRepository.java`
- `repository/BarbeiroRepository.java`
- `repository/ServicoRepository.java`
- `repository/AgendamentoRepository.java`

### 4. Serviços
- `service/EstabelecimentoService.java`
- `service/ClienteService.java`

### 5. DTOs
- `dto/EstabelecimentoRequestDTO.java`
- `dto/EstabelecimentoResponseDTO.java`
- `dto/ClienteRegisterDTO.java`
- `dto/ClienteLoginDTO.java`
- `dto/ClienteResponseDTO.java`

### 6. Mappers
- `mapper/EstabelecimentoMapper.java`
- `mapper/ClienteMapper.java`

### 7. Controllers e OpenAPI
- `controller/EstabelecimentoController.java`
- `controller/ClienteController.java`
- A configuração OpenAPI (`config/OpenApiConfig.java`) já estava presente e agora expõe os novos endpoints.

## Frontend

### 1. Conexão real com o backend
- `frontend/app/auth/login.tsx`
  - Habilitado o `fetch` para chamar o endpoint `/api/clientes/login`
  - Mostra mensagem de sucesso ou erro retornada pela API

### 2. Registro de clientes e estabelecimentos
- `frontend/app/auth/register.tsx`
  - Já estava apontando para `http://localhost:8080/api`
  - Continua usando os endpoints `/api/estabelecimentos` e `/api/clientes/register`

## Observações
- O backend foi implementado usando JPA com PostgreSQL e `spring.jpa.hibernate.ddl-auto=update` para criar as tabelas automaticamente.
- Para rodar localmente, o banco deve estar disponível em `jdbc:postgresql://localhost:5432/agenda_db` conforme `application.properties`.
- A API está disponível em `/api` e a documentação Swagger pode ser acessada em `/swagger-ui.html`.
