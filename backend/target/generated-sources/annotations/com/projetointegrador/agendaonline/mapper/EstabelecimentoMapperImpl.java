package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.EstabelecimentoResponseDTO;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.Proprietario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-16T02:07:27-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class EstabelecimentoMapperImpl implements EstabelecimentoMapper {

    @Override
    public EstabelecimentoResponseDTO toResponse(Estabelecimento estabelecimento) {
        if ( estabelecimento == null ) {
            return null;
        }

        EstabelecimentoResponseDTO estabelecimentoResponseDTO = new EstabelecimentoResponseDTO();

        estabelecimentoResponseDTO.setProprietarioId( estabelecimentoProprietarioId( estabelecimento ) );
        estabelecimentoResponseDTO.setId( estabelecimento.getId() );
        estabelecimentoResponseDTO.setNome( estabelecimento.getNome() );
        estabelecimentoResponseDTO.setEndereco( estabelecimento.getEndereco() );
        estabelecimentoResponseDTO.setTelefone( estabelecimento.getTelefone() );
        estabelecimentoResponseDTO.setWhatsapp( estabelecimento.getWhatsapp() );
        estabelecimentoResponseDTO.setEmail( estabelecimento.getEmail() );
        estabelecimentoResponseDTO.setTipoNegocio( estabelecimento.getTipoNegocio() );

        return estabelecimentoResponseDTO;
    }

    private Long estabelecimentoProprietarioId(Estabelecimento estabelecimento) {
        if ( estabelecimento == null ) {
            return null;
        }
        Proprietario proprietario = estabelecimento.getProprietario();
        if ( proprietario == null ) {
            return null;
        }
        Long id = proprietario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
