package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProprietarioRepository extends JpaRepository<Proprietario, Long> {
    Optional<Proprietario> findByEmail(String email);
}
