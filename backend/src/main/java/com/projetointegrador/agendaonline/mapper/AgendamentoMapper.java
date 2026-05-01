package com.projetointegrador.agendaonline.mapper;

import com.projetointegrador.agendaonline.dto.AgendamentoResponseDto;
import com.projetointegrador.agendaonline.model.Agendamento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nome", target = "clienteNome")
    @Mapping(source = "estabelecimento.id", target = "estabelecimentoId")
    @Mapping(source = "estabelecimento.nome", target = "estabelecimentoNome")
    @Mapping(source = "profissional.id", target = "profissionalId")
    @Mapping(source = "profissional.nome", target = "profissionalNome")
    @Mapping(source = "servico.id", target = "servicoId")
    @Mapping(source = "servico.nome", target = "servicoNome")
    @Mapping(source = "status", target = "status")
    AgendamentoResponseDto toDto(Agendamento agendamento);
}
