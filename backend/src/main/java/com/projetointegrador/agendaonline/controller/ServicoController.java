package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.ServicoRequestDTO;
import com.projetointegrador.agendaonline.dto.ServicoResponseDTO;
import com.projetointegrador.agendaonline.service.ServicoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicos")
@CrossOrigin(origins = "*")
@Tag(name = "Serviços", description = "Consulta serviços disponíveis")
public class ServicoController {

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    @Operation(summary = "Lista serviços")
    public List<ServicoResponseDTO> listar(@RequestParam(required = false) Long estabelecimentoId) {
        return servicoService.listarTodos(estabelecimentoId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria um novo serviço")
    public ServicoResponseDTO criar(@RequestBody ServicoRequestDTO dto) {
        return servicoService.criar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um serviço")
    public ServicoResponseDTO atualizar(@PathVariable Long id, @RequestBody ServicoRequestDTO dto) {
        return servicoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Exclui um serviço")
    public void deletar(@PathVariable Long id) {
        servicoService.deletar(id);
    }
}
