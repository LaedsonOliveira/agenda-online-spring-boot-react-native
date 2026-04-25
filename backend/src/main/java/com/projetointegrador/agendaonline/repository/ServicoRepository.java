package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ServicoRepository extends JpaRepository<Servico, UUID> {

    List<Servico> findByEstabelecimentoId(UUID estabelecimentoId);
}
