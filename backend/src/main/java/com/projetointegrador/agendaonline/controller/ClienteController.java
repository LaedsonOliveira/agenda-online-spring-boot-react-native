package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.ClienteLoginDTO;
import com.projetointegrador.agendaonline.dto.ClienteRegisterDTO;
import com.projetointegrador.agendaonline.dto.ClienteResponseDTO;
import com.projetointegrador.agendaonline.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
@Tag(name = "Clientes", description = "Cadastro, login e autenticação de clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registra um novo cliente")
    public ClienteResponseDTO register(@Valid @RequestBody ClienteRegisterDTO dto) {
        return clienteService.registrar(dto);
    }

    @PostMapping("/login")
    @Operation(summary = "Autentica cliente por e-mail e senha")
    public ClienteResponseDTO login(@Valid @RequestBody ClienteLoginDTO dto) {
        return clienteService.autenticar(dto);
    }
}
