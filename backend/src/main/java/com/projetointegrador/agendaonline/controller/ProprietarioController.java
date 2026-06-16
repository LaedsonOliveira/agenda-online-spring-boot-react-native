package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.ProprietarioLoginDTO;
import com.projetointegrador.agendaonline.dto.ProprietarioRegisterDTO;
import com.projetointegrador.agendaonline.dto.ProprietarioResponseDTO;
import com.projetointegrador.agendaonline.service.ProprietarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proprietarios")
@CrossOrigin(origins = "*")
@Tag(name = "Proprietários", description = "Gerencia proprietários de estabelecimentos")
public class ProprietarioController {

    private final ProprietarioService proprietarioService;

    public ProprietarioController(ProprietarioService proprietarioService) {
        this.proprietarioService = proprietarioService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria um novo proprietário")
    public ProprietarioResponseDTO criarProprietario(@Valid @RequestBody ProprietarioRegisterDTO dto) {
        return proprietarioService.criar(dto);
    }

    @PostMapping("/login")
    @Operation(summary = "Autentica proprietário por e-mail e senha")
    public ProprietarioResponseDTO login(@Valid @RequestBody ProprietarioLoginDTO dto) {
        return proprietarioService.autenticar(dto);
    }
}
