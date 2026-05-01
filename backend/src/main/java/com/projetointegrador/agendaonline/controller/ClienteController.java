package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.ClienteDto;
import com.projetointegrador.agendaonline.dto.ClienteLoginRequest;
import com.projetointegrador.agendaonline.dto.ClienteRegisterRequest;
import com.projetointegrador.agendaonline.mapper.ClienteMapper;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import com.projetointegrador.agendaonline.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
@Tag(name = "Clientes", description = "Operações para clientes do aplicativo de agendamento")
public class ClienteController {

    private final ClienteService clienteService;
    private final ClienteMapper clienteMapper;
    private final EstabelecimentoRepository estabelecimentoRepository;

    public ClienteController(ClienteService clienteService, ClienteMapper clienteMapper,
            EstabelecimentoRepository estabelecimentoRepository) {
        this.clienteService = clienteService;
        this.clienteMapper = clienteMapper;
        this.estabelecimentoRepository = estabelecimentoRepository;
    }

    @PostMapping("/login")
    @Operation(summary = "Autenticar cliente", description = "Realiza login do cliente pelo e-mail e senha")
    public ClienteDto login(@Valid @RequestBody ClienteLoginRequest request) {
        return clienteMapper.toDto(clienteService.authenticate(request.getEmail(), request.getSenha()));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cadastrar cliente", description = "Registra um novo cliente para realizar agendamentos no estabelecimento")
    public ClienteDto register(@Valid @RequestBody ClienteRegisterRequest request) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(request.getEstabelecimentoId())
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Estabelecimento não encontrado."));

        Cliente cliente = new Cliente();
        cliente.setNome(request.getNome());
        cliente.setEmail(request.getEmail());
        cliente.setWhatsapp(request.getWhatsapp());
        cliente.setDataNascimento(request.getDataNascimento());
        cliente.setEstabelecimento(estabelecimento);

        return clienteMapper.toDto(clienteService.register(cliente, request.getSenha()));
    }
}
