package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.AgendamentoRequestDto;
import com.projetointegrador.agendaonline.dto.AgendamentoResponseDto;
import com.projetointegrador.agendaonline.service.AgendamentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*")
@Tag(name = "Agendamentos", description = "Operações para criar e consultar agendamentos de clientes")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping
    @Operation(summary = "Criar agendamento", description = "Registra um novo agendamento para cliente em estabelecimento de barbearia")
    public AgendamentoResponseDto criarAgendamento(@Valid @RequestBody AgendamentoRequestDto request) {
        return agendamentoService.create(request);
    }

    @GetMapping("/cliente/{clienteId}")
    @Operation(summary = "Listar agendamentos do cliente", description = "Retorna todos os agendamentos cadastrados por um cliente")
    public List<AgendamentoResponseDto> listarPorCliente(@PathVariable("clienteId") String clienteId) {
        return agendamentoService.findByClienteId(java.util.UUID.fromString(clienteId));
    }
}
