package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
}
