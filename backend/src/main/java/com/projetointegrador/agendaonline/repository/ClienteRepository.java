package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
}
