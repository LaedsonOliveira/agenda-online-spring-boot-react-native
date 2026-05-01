package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {

    List<Agendamento> findByProfissionalId(UUID profissionalId);

    List<Agendamento> findByClienteId(UUID clienteId);

    List<Agendamento> findByEstabelecimentoId(UUID estabelecimentoId);

    // Base para validação de conflito de horário (você vai usar isso já já)
    List<Agendamento> findByProfissionalIdAndDataHoraInicioBetween(
            UUID profissionalId,
            OffsetDateTime inicio,
            OffsetDateTime fim);
}
