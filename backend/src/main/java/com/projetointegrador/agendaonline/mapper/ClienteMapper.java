package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.ClienteDto;
import com.projetointegrador.agendaonline.model.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(source = "estabelecimento.id", target = "estabelecimentoId")
    @Mapping(source = "estabelecimento.nome", target = "estabelecimentoNome")
    ClienteDto toDto(Cliente cliente);
}
