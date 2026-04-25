package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.ProfissionalServico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProfissionalServicoRepository extends JpaRepository<ProfissionalServico, UUID> {

//    List<ProfissionalServico> findByEstabelecimento_Id(UUID estabelecimentoId);

    // List<ProfissionalServico> findByWhatsappAndEstabelecimento_Id(String
    // whatsapp, UUID estabelecimentoId);
}