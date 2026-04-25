package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProfissionalRepository extends JpaRepository<Profissional, UUID> {

    List<Profissional> findByEstabelecimentoId(UUID estabelecimentoId);
}
