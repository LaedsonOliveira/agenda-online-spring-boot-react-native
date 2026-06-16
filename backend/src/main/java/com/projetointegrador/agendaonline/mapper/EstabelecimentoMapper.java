package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.EstabelecimentoResponseDTO;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EstabelecimentoMapper {

    @Mapping(source = "proprietario.id", target = "proprietarioId")
    EstabelecimentoResponseDTO toResponse(Estabelecimento estabelecimento);
}
