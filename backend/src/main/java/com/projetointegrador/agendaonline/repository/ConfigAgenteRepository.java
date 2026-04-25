package com.projetointegrador.agendaonline.repository;


import com.projetointegrador.agendaonline.model.ConfigAgente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ConfigAgenteRepository extends JpaRepository<ConfigAgente, UUID> {

    Optional<ConfigAgente> findByEstabelecimentoId(UUID estabelecimentoId);
}