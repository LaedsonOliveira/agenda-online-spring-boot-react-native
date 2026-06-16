package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.EstabelecimentoRequestDTO;
import com.projetointegrador.agendaonline.dto.EstabelecimentoResponseDTO;
import com.projetointegrador.agendaonline.service.EstabelecimentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estabelecimentos")
@CrossOrigin(origins = "*")
@Tag(name = "Estabelecimentos", description = "Gerencia estabelecimentos e suas informações")
public class EstabelecimentoController {

    private final EstabelecimentoService estabelecimentoService;

    public EstabelecimentoController(EstabelecimentoService estabelecimentoService) {
        this.estabelecimentoService = estabelecimentoService;
    }

    @GetMapping
    @Operation(summary = "Lista todos os estabelecimentos")
    public List<EstabelecimentoResponseDTO> listarEstabelecimentos() {
        return estabelecimentoService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca estabelecimento por ID")
    public EstabelecimentoResponseDTO buscarEstabelecimento(@PathVariable Long id) {
        return estabelecimentoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um estabelecimento")
    public EstabelecimentoResponseDTO atualizarEstabelecimento(
            @PathVariable Long id,
            @Valid @RequestBody EstabelecimentoRequestDTO dto) {
        return estabelecimentoService.atualizar(id, dto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria um novo estabelecimento")
    public EstabelecimentoResponseDTO criarEstabelecimento(@Valid @RequestBody EstabelecimentoRequestDTO dto) {
        return estabelecimentoService.criar(dto);
    }
}
