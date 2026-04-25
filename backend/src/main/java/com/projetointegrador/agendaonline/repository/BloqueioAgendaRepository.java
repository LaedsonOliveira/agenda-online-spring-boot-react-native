package com.projetointegrador.agendaonline.repository;


import com.projetointegrador.agendaonline.model.BloqueioAgenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BloqueioAgendaRepository extends JpaRepository<BloqueioAgenda, UUID> {

    List<BloqueioAgenda> findByProfissionalId(UUID profissionalId);
}