package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.HorarioDisponivel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HorarioDisponivelRepository extends JpaRepository<HorarioDisponivel, Long> {

    List<HorarioDisponivel> findByProfissionalId(UUID profissionalId);

}
