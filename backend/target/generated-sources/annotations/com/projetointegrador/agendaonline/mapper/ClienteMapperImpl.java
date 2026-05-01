package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ClienteDto;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-01T16:09:28-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
)
@Component
public class ClienteMapperImpl implements ClienteMapper {

    @Override
    public ClienteDto toDto(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        ClienteDto clienteDto = new ClienteDto();

        clienteDto.setEstabelecimentoId( clienteEstabelecimentoId( cliente ) );
        clienteDto.setEstabelecimentoNome( clienteEstabelecimentoNome( cliente ) );
        clienteDto.setId( cliente.getId() );
        clienteDto.setNome( cliente.getNome() );
        clienteDto.setEmail( cliente.getEmail() );
        clienteDto.setWhatsapp( cliente.getWhatsapp() );
        clienteDto.setDataNascimento( cliente.getDataNascimento() );
        clienteDto.setTotalAgendamentos( cliente.getTotalAgendamentos() );
        clienteDto.setBloqueado( cliente.getBloqueado() );

        return clienteDto;
    }

    private UUID clienteEstabelecimentoId(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }
        Estabelecimento estabelecimento = cliente.getEstabelecimento();
        if ( estabelecimento == null ) {
            return null;
        }
        UUID id = estabelecimento.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String clienteEstabelecimentoNome(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }
        Estabelecimento estabelecimento = cliente.getEstabelecimento();
        if ( estabelecimento == null ) {
            return null;
        }
        String nome = estabelecimento.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }
}
