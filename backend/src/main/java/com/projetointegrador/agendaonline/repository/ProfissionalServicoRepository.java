package com.projetointegrador.agendaonline.repository;

import com.projetointegrador.agendaonline.model.ProfissionalServico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProfissionalServicoRepository extends JpaRepository<ProfissionalServico, UUID> {

    List<ProfissionalServico> findByProfissional_Id(UUID profissionalId);

    List<ProfissionalServico> findByServico_Id(UUID servicoId);

    List<ProfissionalServico> findByProfissional_Estabelecimento_Id(UUID estabelecimentoId);

    List<ProfissionalServico> findByServico_Estabelecimento_Id(UUID estabelecimentoId);

    List<ProfissionalServico> findByProfissional_Estabelecimento_WhatsappAndProfissional_Estabelecimento_Id(
            String whatsapp,
            UUID estabelecimentoId);
}