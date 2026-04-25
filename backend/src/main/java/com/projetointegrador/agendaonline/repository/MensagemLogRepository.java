package com.projetointegrador.agendaonline.repository;


import com.projetointegrador.agendaonline.model.MensagemLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MensagemLogRepository extends JpaRepository<MensagemLog, UUID> {

    List<MensagemLog> findByConversaId(UUID conversaId);
}