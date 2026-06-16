package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ProprietarioResponseDTO;
import com.projetointegrador.agendaonline.model.Proprietario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProprietarioMapper {
    ProprietarioResponseDTO toResponse(Proprietario proprietario);
}
