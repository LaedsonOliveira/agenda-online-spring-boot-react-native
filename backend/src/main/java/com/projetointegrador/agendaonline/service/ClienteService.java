package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Cliente authenticate(String email, String senha) {
        return clienteRepository.findByEmail(email)
                .filter(cliente -> passwordEncoder.matches(senha, cliente.getSenhaHash()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos."));
    }

    public Cliente findById(java.util.UUID clienteId) {
        return clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
    }

    public Cliente register(Cliente cliente, String senha) {
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um cliente com esse e-mail.");
        }

        cliente.setSenhaHash(passwordEncoder.encode(senha));
        return clienteRepository.save(cliente);
    }
}
