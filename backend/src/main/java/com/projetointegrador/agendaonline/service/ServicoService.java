package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.ServicoRequestDTO;
import com.projetointegrador.agendaonline.dto.ServicoResponseDTO;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.Servico;
import com.projetointegrador.agendaonline.repository.ServicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<ServicoResponseDTO> listarTodos(Long estabelecimentoId) {
        return servicoRepository.findAll()
                .stream()
                .filter(servico -> estabelecimentoId == null || servico.getEstabelecimento() == null
                        || estabelecimentoId.equals(servico.getEstabelecimento().getId()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ServicoResponseDTO criar(ServicoRequestDTO dto) {
        Servico servico = toEntity(dto);
        return toResponse(servicoRepository.save(servico));
    }

    public ServicoResponseDTO atualizar(Long id, ServicoRequestDTO dto) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado: " + id));

        servico.setNome(dto.getNome());
        servico.setDescricao(dto.getDescricao());
        servico.setPrecoBase(dto.getPrecoBase());
        servico.setDuracaoMinutos(dto.getDuracaoMinutos());
        servico.setAtivo(dto.getAtivo() != null ? dto.getAtivo() : Boolean.TRUE);
        return toResponse(servicoRepository.save(servico));
    }

    public void deletar(Long id) {
        if (!servicoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado: " + id);
        }
        servicoRepository.deleteById(id);
    }

    private Servico toEntity(ServicoRequestDTO dto) {
        Servico servico = Servico.builder()
                .nome(dto.getNome())
                .descricao(dto.getDescricao())
                .precoBase(dto.getPrecoBase())
                .duracaoMinutos(dto.getDuracaoMinutos())
                .ativo(dto.getAtivo() != null ? dto.getAtivo() : Boolean.TRUE)
                .build();

        if (dto.getEstabelecimentoId() != null) {
            servico.setEstabelecimento(Estabelecimento.builder().id(dto.getEstabelecimentoId()).build());
        }
        return servico;
    }

    private ServicoResponseDTO toResponse(Servico servico) {
        ServicoResponseDTO dto = new ServicoResponseDTO();
        dto.setId(servico.getId());
        dto.setNome(servico.getNome());
        dto.setDescricao(servico.getDescricao());
        dto.setPrecoBase(servico.getPrecoBase());
        dto.setDuracaoMinutos(servico.getDuracaoMinutos());
        dto.setAtivo(servico.getAtivo());
        dto.setEstabelecimentoId(servico.getEstabelecimento() != null ? servico.getEstabelecimento().getId() : null);
        return dto;
    }
}
