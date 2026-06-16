package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.BarbeiroRequestDTO;
import com.projetointegrador.agendaonline.dto.BarbeiroResponseDTO;
import com.projetointegrador.agendaonline.service.BarbeiroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/barbeiros")
@CrossOrigin(origins = "*")
@Tag(name = "Barbeiros", description = "Gerencia barbeiros do estabelecimento")
public class BarbeiroController {

    private final BarbeiroService barbeiroService;

    public BarbeiroController(BarbeiroService barbeiroService) {
        this.barbeiroService = barbeiroService;
    }

    @GetMapping
    @Operation(summary = "Lista barbeiros")
    public List<BarbeiroResponseDTO> listar(@RequestParam(required = false) Long estabelecimentoId) {
        return barbeiroService.listarTodos(estabelecimentoId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca barbeiro por id")
    public BarbeiroResponseDTO buscarPorId(@PathVariable Long id) {
        return barbeiroService.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Cria um barbeiro")
    public BarbeiroResponseDTO criar(@Valid @RequestBody BarbeiroRequestDTO dto) {
        return barbeiroService.criar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um barbeiro")
    public BarbeiroResponseDTO atualizar(@PathVariable Long id, @RequestBody BarbeiroRequestDTO dto) {
        return barbeiroService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um barbeiro")
    public void deletar(@PathVariable Long id) {
        barbeiroService.deletar(id);
    }
}
