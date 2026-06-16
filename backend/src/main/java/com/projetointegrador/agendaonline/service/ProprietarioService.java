package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.ProprietarioLoginDTO;
import com.projetointegrador.agendaonline.dto.ProprietarioRegisterDTO;
import com.projetointegrador.agendaonline.dto.ProprietarioResponseDTO;
import com.projetointegrador.agendaonline.mapper.ProprietarioMapper;
import com.projetointegrador.agendaonline.model.Proprietario;
import com.projetointegrador.agendaonline.repository.ProprietarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@Transactional
public class ProprietarioService {

    private final ProprietarioRepository proprietarioRepository;
    private final ProprietarioMapper proprietarioMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ProprietarioService(ProprietarioRepository proprietarioRepository,
            ProprietarioMapper proprietarioMapper) {
        this.proprietarioRepository = proprietarioRepository;
        this.proprietarioMapper = proprietarioMapper;
    }

    public ProprietarioResponseDTO criar(ProprietarioRegisterDTO dto) {
        if (proprietarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado");
        }

        Proprietario proprietario = Proprietario.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .whatsapp(dto.getWhatsapp())
                .build();

        proprietario = proprietarioRepository.save(proprietario);
        return proprietarioMapper.toResponse(proprietario);
    }

    public ProprietarioResponseDTO autenticar(ProprietarioLoginDTO dto) {
        Proprietario proprietario = proprietarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), proprietario.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos");
        }

        return proprietarioMapper.toResponse(proprietario);
    }
}
