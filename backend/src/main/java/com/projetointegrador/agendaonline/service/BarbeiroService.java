package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.BarbeiroRequestDTO;
import com.projetointegrador.agendaonline.dto.BarbeiroResponseDTO;
import com.projetointegrador.agendaonline.model.Barbeiro;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.enuns.StatusOperacional;
import com.projetointegrador.agendaonline.repository.BarbeiroRepository;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BarbeiroService {

    private final BarbeiroRepository barbeiroRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public BarbeiroService(BarbeiroRepository barbeiroRepository,
            EstabelecimentoRepository estabelecimentoRepository) {
        this.barbeiroRepository = barbeiroRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
    }

    public List<BarbeiroResponseDTO> listarTodos(Long estabelecimentoId) {
        return barbeiroRepository.findAll()
                .stream()
                .filter(barbeiro -> estabelecimentoId == null || barbeiro.getEstabelecimento() == null
                        || estabelecimentoId.equals(barbeiro.getEstabelecimento().getId()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public BarbeiroResponseDTO buscarPorId(Long id) {
        return barbeiroRepository.findById(Objects.requireNonNull(id, "id não pode ser nulo"))
                .map(this::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbeiro não encontrado"));
    }

    @SuppressWarnings("null")
    public BarbeiroResponseDTO criar(BarbeiroRequestDTO dto) {
        Long estabelecimentoId = Objects.requireNonNull(dto.getEstabelecimentoId(), "EstabelecimentoId não pode ser nulo");
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(estabelecimentoId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estabelecimento não encontrado"));

        Barbeiro barbeiro = new Barbeiro();
        barbeiro.setNome(dto.getNome());
        barbeiro.setEmail(dto.getEmail());
        barbeiro.setSenha(dto.getSenha() != null ? passwordEncoder.encode(dto.getSenha()) : null);
        barbeiro.setEspecialidade(dto.getEspecialidade());
        barbeiro.setFotoUrl(dto.getFotoUrl());
        barbeiro.setStatusOperacional(dto.getAtivo() == null || dto.getAtivo() ? StatusOperacional.DISPONIVEL : StatusOperacional.OFFLINE);
        barbeiro.setEstabelecimento(estabelecimento);

        Barbeiro savedBarbeiro = Optional.ofNullable(barbeiroRepository.save(barbeiro))
                .orElseThrow(() -> new IllegalStateException("Barbeiro salvo não pode ser nulo"));
        return toResponse(savedBarbeiro);
    }

    @SuppressWarnings("null")
    public BarbeiroResponseDTO atualizar(Long id, BarbeiroRequestDTO dto) {
        Barbeiro barbeiro = barbeiroRepository.findById(Objects.requireNonNull(id, "id não pode ser nulo"))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbeiro não encontrado"));

        if (dto.getNome() != null) barbeiro.setNome(dto.getNome());
        if (dto.getEmail() != null) barbeiro.setEmail(dto.getEmail());
        if (dto.getSenha() != null) barbeiro.setSenha(passwordEncoder.encode(dto.getSenha()));
        if (dto.getEspecialidade() != null) barbeiro.setEspecialidade(dto.getEspecialidade());
        if (dto.getFotoUrl() != null) barbeiro.setFotoUrl(dto.getFotoUrl());
        if (dto.getAtivo() != null) {
            barbeiro.setStatusOperacional(dto.getAtivo() ? StatusOperacional.DISPONIVEL : StatusOperacional.OFFLINE);
        }
        if (dto.getEstabelecimentoId() != null && !dto.getEstabelecimentoId().equals(barbeiro.getEstabelecimento().getId())) {
            Long estabelecimentoId = Objects.requireNonNull(dto.getEstabelecimentoId(), "EstabelecimentoId não pode ser nulo");
            Estabelecimento estabelecimento = estabelecimentoRepository.findById(estabelecimentoId)
                    .orElseThrow(
                            () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estabelecimento não encontrado"));
            barbeiro.setEstabelecimento(estabelecimento);
        }

        Barbeiro savedBarbeiro = Optional.ofNullable(barbeiroRepository.save(barbeiro))
                .orElseThrow(() -> new IllegalStateException("Barbeiro salvo não pode ser nulo"));
        return toResponse(savedBarbeiro);
    }

    public void deletar(Long id) {
        if (!barbeiroRepository.existsById(Objects.requireNonNull(id, "id não pode ser nulo"))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbeiro não encontrado");
        }
        barbeiroRepository.deleteById(Objects.requireNonNull(id, "id não pode ser nulo"));
    }

    private BarbeiroResponseDTO toResponse(Barbeiro barbeiro) {
        BarbeiroResponseDTO dto = new BarbeiroResponseDTO();
        dto.setId(barbeiro.getId());
        dto.setNome(barbeiro.getNome());
        dto.setEmail(barbeiro.getEmail());
        dto.setEspecialidade(barbeiro.getEspecialidade());
        dto.setFotoUrl(barbeiro.getFotoUrl());
        dto.setStatusOperacional(barbeiro.getStatusOperacional());
        dto.setEstabelecimentoId(barbeiro.getEstabelecimento() != null ? barbeiro.getEstabelecimento().getId() : null);
        return dto;
    }
}
