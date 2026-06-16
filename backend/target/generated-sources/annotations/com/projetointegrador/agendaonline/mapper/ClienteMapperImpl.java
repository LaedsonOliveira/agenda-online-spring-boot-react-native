package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ClienteResponseDTO;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-16T02:07:27-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ClienteMapperImpl implements ClienteMapper {

    private final DateTimeFormatter dateTimeFormatter_yyyy_MM_dd_0159776256 = DateTimeFormatter.ofPattern( "yyyy-MM-dd" );

    @Override
    public ClienteResponseDTO toResponse(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        ClienteResponseDTO clienteResponseDTO = new ClienteResponseDTO();

        clienteResponseDTO.setEstabelecimentoId( clienteEstabelecimentoId( cliente ) );
        if ( cliente.getDataNascimento() != null ) {
            clienteResponseDTO.setDataNascimento( dateTimeFormatter_yyyy_MM_dd_0159776256.format( cliente.getDataNascimento() ) );
        }
        clienteResponseDTO.setId( cliente.getId() );
        clienteResponseDTO.setNome( cliente.getNome() );
        clienteResponseDTO.setEmail( cliente.getEmail() );
        clienteResponseDTO.setWhatsapp( cliente.getWhatsapp() );

        return clienteResponseDTO;
    }

    private Long clienteEstabelecimentoId(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }
        Estabelecimento estabelecimento = cliente.getEstabelecimento();
        if ( estabelecimento == null ) {
            return null;
        }
        Long id = estabelecimento.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
