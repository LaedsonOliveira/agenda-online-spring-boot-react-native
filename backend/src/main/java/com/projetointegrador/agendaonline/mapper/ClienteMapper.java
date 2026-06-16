package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ClienteResponseDTO;
import com.projetointegrador.agendaonline.model.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(source = "estabelecimento.id", target = "estabelecimentoId")
    @Mapping(target = "dataNascimento", dateFormat = "yyyy-MM-dd")
    ClienteResponseDTO toResponse(Cliente cliente);
}
