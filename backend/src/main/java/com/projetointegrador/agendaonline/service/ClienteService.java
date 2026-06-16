package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.ClienteLoginDTO;
import com.projetointegrador.agendaonline.dto.ClienteRegisterDTO;
import com.projetointegrador.agendaonline.dto.ClienteResponseDTO;
import com.projetointegrador.agendaonline.mapper.ClienteMapper;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.repository.ClienteRepository;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@Transactional
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ClienteMapper clienteMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ClienteService(ClienteRepository clienteRepository,
            EstabelecimentoRepository estabelecimentoRepository,
            ClienteMapper clienteMapper) {
        this.clienteRepository = clienteRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.clienteMapper = clienteMapper;
    }

    public ClienteResponseDTO registrar(ClienteRegisterDTO dto) {
        if (clienteRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado");
        }

        Estabelecimento estabelecimento = estabelecimentoRepository.findById(dto.getEstabelecimentoId())
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estabelecimento não encontrado"));

        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        cliente.setWhatsapp(dto.getWhatsapp());
        cliente.setEstabelecimento(estabelecimento);

        if (dto.getDataNascimento() != null && !dto.getDataNascimento().isBlank()) {
            try {
                cliente.setDataNascimento(LocalDate.parse(dto.getDataNascimento()));
            } catch (Exception ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Data de nascimento inválida. Use YYYY-MM-DD");
            }
        }

        Cliente salvo = clienteRepository.save(cliente);
        return clienteMapper.toResponse(salvo);
    }

    public ClienteResponseDTO autenticar(ClienteLoginDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), cliente.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos");
        }

        return clienteMapper.toResponse(cliente);
    }
}
