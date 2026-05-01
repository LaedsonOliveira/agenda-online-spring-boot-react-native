package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.AgendamentoResponseDto;
import com.projetointegrador.agendaonline.model.Agendamento;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.Profissional;
import com.projetointegrador.agendaonline.model.Servico;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-01T16:09:28-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
)
@Component
public class AgendamentoMapperImpl implements AgendamentoMapper {

    @Override
    public AgendamentoResponseDto toDto(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }

        AgendamentoResponseDto agendamentoResponseDto = new AgendamentoResponseDto();

        agendamentoResponseDto.setClienteId( agendamentoClienteId( agendamento ) );
        agendamentoResponseDto.setClienteNome( agendamentoClienteNome( agendamento ) );
        agendamentoResponseDto.setEstabelecimentoId( agendamentoEstabelecimentoId( agendamento ) );
        agendamentoResponseDto.setEstabelecimentoNome( agendamentoEstabelecimentoNome( agendamento ) );
        agendamentoResponseDto.setProfissionalId( agendamentoProfissionalId( agendamento ) );
        agendamentoResponseDto.setProfissionalNome( agendamentoProfissionalNome( agendamento ) );
        agendamentoResponseDto.setServicoId( agendamentoServicoId( agendamento ) );
        agendamentoResponseDto.setServicoNome( agendamentoServicoNome( agendamento ) );
        if ( agendamento.getStatus() != null ) {
            agendamentoResponseDto.setStatus( agendamento.getStatus().name() );
        }
        agendamentoResponseDto.setId( agendamento.getId() );
        agendamentoResponseDto.setDataHoraInicio( agendamento.getDataHoraInicio() );
        agendamentoResponseDto.setDataHoraFim( agendamento.getDataHoraFim() );
        agendamentoResponseDto.setValorCobrado( agendamento.getValorCobrado() );
        agendamentoResponseDto.setObservacao( agendamento.getObservacao() );
        agendamentoResponseDto.setCriadoEm( agendamento.getCriadoEm() );

        return agendamentoResponseDto;
    }

    private UUID agendamentoClienteId(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Cliente cliente = agendamento.getCliente();
        if ( cliente == null ) {
            return null;
        }
        UUID id = cliente.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String agendamentoClienteNome(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Cliente cliente = agendamento.getCliente();
        if ( cliente == null ) {
            return null;
        }
        String nome = cliente.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private UUID agendamentoEstabelecimentoId(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Estabelecimento estabelecimento = agendamento.getEstabelecimento();
        if ( estabelecimento == null ) {
            return null;
        }
        UUID id = estabelecimento.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String agendamentoEstabelecimentoNome(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Estabelecimento estabelecimento = agendamento.getEstabelecimento();
        if ( estabelecimento == null ) {
            return null;
        }
        String nome = estabelecimento.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private UUID agendamentoProfissionalId(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Profissional profissional = agendamento.getProfissional();
        if ( profissional == null ) {
            return null;
        }
        UUID id = profissional.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String agendamentoProfissionalNome(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Profissional profissional = agendamento.getProfissional();
        if ( profissional == null ) {
            return null;
        }
        String nome = profissional.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private UUID agendamentoServicoId(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Servico servico = agendamento.getServico();
        if ( servico == null ) {
            return null;
        }
        UUID id = servico.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String agendamentoServicoNome(Agendamento agendamento) {
        if ( agendamento == null ) {
            return null;
        }
        Servico servico = agendamento.getServico();
        if ( servico == null ) {
            return null;
        }
        String nome = servico.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }
}
