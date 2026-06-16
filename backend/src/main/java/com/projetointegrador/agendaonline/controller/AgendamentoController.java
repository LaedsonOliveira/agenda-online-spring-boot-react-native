package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.AgendamentoRequestDTO;
import com.projetointegrador.agendaonline.dto.AgendamentoResponseDTO;
import com.projetointegrador.agendaonline.service.AgendamentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*")
@Tag(name = "Agendamentos", description = "Gerencia agendamentos de clientes e barbeiros")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    @Operation(summary = "Lista agendamentos")
    public List<AgendamentoResponseDTO> listar(@RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) Long barbeiroId) {
        return agendamentoService.listar(clienteId, barbeiroId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria novo agendamento")
    public AgendamentoResponseDTO criar(@Valid @RequestBody AgendamentoRequestDTO dto) {
        return agendamentoService.criar(dto);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Atualiza status do agendamento")
    public AgendamentoResponseDTO atualizarStatus(@PathVariable Long id,
            @RequestParam String status) {
        return agendamentoService.atualizarStatus(id, status);
    }
}
