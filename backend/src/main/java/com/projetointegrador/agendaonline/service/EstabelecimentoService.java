package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.EstabelecimentoRequestDTO;
import com.projetointegrador.agendaonline.dto.EstabelecimentoResponseDTO;
import com.projetointegrador.agendaonline.mapper.EstabelecimentoMapper;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import com.projetointegrador.agendaonline.repository.ProprietarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EstabelecimentoService {

    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ProprietarioRepository proprietarioRepository;
    private final EstabelecimentoMapper estabelecimentoMapper;

    public EstabelecimentoService(EstabelecimentoRepository estabelecimentoRepository,
            ProprietarioRepository proprietarioRepository,
            EstabelecimentoMapper estabelecimentoMapper) {
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.proprietarioRepository = proprietarioRepository;
        this.estabelecimentoMapper = estabelecimentoMapper;
    }

    public List<EstabelecimentoResponseDTO> listarTodos() {
        return estabelecimentoRepository.findAll()
                .stream()
                .map(estabelecimentoMapper::toResponse)
                .collect(Collectors.toList());
    }

    public EstabelecimentoResponseDTO buscarPorId(Long id) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Estabelecimento não encontrado"));
        return estabelecimentoMapper.toResponse(estabelecimento);
    }

    public EstabelecimentoResponseDTO atualizar(Long id, EstabelecimentoRequestDTO dto) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Estabelecimento não encontrado"));

        estabelecimento.setNome(dto.getNome());
        estabelecimento.setEndereco(dto.getEndereco());
        estabelecimento.setTelefone(dto.getTelefone());
        estabelecimento.setWhatsapp(dto.getWhatsapp());
        estabelecimento.setEmail(dto.getEmail());
        estabelecimento.setTipoNegocio(dto.getTipoNegocio());

        if (dto.getProprietarioId() != null) {
            proprietarioRepository.findById(dto.getProprietarioId())
                    .ifPresent(estabelecimento::setProprietario);
        }

        return estabelecimentoMapper.toResponse(estabelecimentoRepository.save(estabelecimento));
    }

    public EstabelecimentoResponseDTO criar(EstabelecimentoRequestDTO dto) {
        Estabelecimento estabelecimento = Estabelecimento.builder()
                .nome(dto.getNome())
                .endereco(dto.getEndereco())
                .telefone(dto.getTelefone())
                .whatsapp(dto.getWhatsapp())
                .email(dto.getEmail())
                .tipoNegocio(dto.getTipoNegocio())
                .build();

        if (dto.getProprietarioId() != null) {
            proprietarioRepository.findById(dto.getProprietarioId())
                    .ifPresent(estabelecimento::setProprietario);
        }

        return estabelecimentoMapper.toResponse(estabelecimentoRepository.save(estabelecimento));
    }
}
