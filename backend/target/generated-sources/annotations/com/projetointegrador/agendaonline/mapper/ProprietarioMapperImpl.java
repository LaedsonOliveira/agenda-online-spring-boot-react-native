package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ProprietarioResponseDTO;
import com.projetointegrador.agendaonline.model.Proprietario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-16T02:07:27-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ProprietarioMapperImpl implements ProprietarioMapper {

    @Override
    public ProprietarioResponseDTO toResponse(Proprietario proprietario) {
        if ( proprietario == null ) {
            return null;
        }

        ProprietarioResponseDTO proprietarioResponseDTO = new ProprietarioResponseDTO();

        proprietarioResponseDTO.setId( proprietario.getId() );
        proprietarioResponseDTO.setNome( proprietario.getNome() );
        proprietarioResponseDTO.setEmail( proprietario.getEmail() );
        proprietarioResponseDTO.setWhatsapp( proprietario.getWhatsapp() );

        return proprietarioResponseDTO;
    }
}
