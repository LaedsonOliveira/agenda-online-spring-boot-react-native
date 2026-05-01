package com.projetointegrador.agendaonline.controller;

import com.projetointegrador.agendaonline.dto.EstabelecimentoCreateRequest;
import com.projetointegrador.agendaonline.dto.EstabelecimentoDto;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.enuns.TipoNegocio;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/estabelecimentos")
@CrossOrigin(origins = "*")
@Tag(name = "Estabelecimentos", description = "Lista de estabelecimentos disponíveis para agendamento")
public class EstabelecimentoController {

    private final EstabelecimentoRepository estabelecimentoRepository;

    public EstabelecimentoController(EstabelecimentoRepository estabelecimentoRepository) {
        this.estabelecimentoRepository = estabelecimentoRepository;
    }

    @GetMapping
    @Operation(summary = "Listar estabelecimentos", description = "Retorna os estabelecimentos disponíveis para cadastro de clientes")
    public List<EstabelecimentoDto> listar() {
        return estabelecimentoRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criar estabelecimento", description = "Registra um novo estabelecimento para associar ao cliente")
    public EstabelecimentoDto criar(@Valid @RequestBody EstabelecimentoCreateRequest request) {
        Estabelecimento estabelecimento = new Estabelecimento();
        estabelecimento.setNome(request.getNome());
        estabelecimento.setEndereco(request.getEndereco());
        estabelecimento.setTelefone(request.getTelefone());
        estabelecimento.setWhatsapp(request.getWhatsapp());
        estabelecimento.setEmail(request.getEmail());
        estabelecimento.setTipoNegocio(request.getTipoNegocio() != null ? TipoNegocio.valueOf(request.getTipoNegocio())
                : TipoNegocio.BARBEARIA);

        Estabelecimento salvo = estabelecimentoRepository.save(estabelecimento);
        return toDto(salvo);
    }

    private EstabelecimentoDto toDto(Estabelecimento estabelecimento) {
        EstabelecimentoDto dto = new EstabelecimentoDto();
        dto.setId(estabelecimento.getId());
        dto.setNome(estabelecimento.getNome());
        return dto;
    }
}
