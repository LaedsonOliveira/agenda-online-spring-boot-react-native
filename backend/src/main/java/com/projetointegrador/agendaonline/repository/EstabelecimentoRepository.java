package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, UUID> {
}
