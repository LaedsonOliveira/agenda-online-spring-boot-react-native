package com.projetointegrador.agendaonline.repository;


import com.projetointegrador.agendaonline.model.ConversaWhatsapp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConversaWhatsappRepository extends JpaRepository<ConversaWhatsapp, UUID> {

    List<ConversaWhatsapp> findByClienteId(UUID clienteId);
}