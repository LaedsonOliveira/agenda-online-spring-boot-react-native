package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.AgendamentoRequestDto;
import com.projetointegrador.agendaonline.dto.AgendamentoResponseDto;
import com.projetointegrador.agendaonline.mapper.AgendamentoMapper;
import com.projetointegrador.agendaonline.model.Agendamento;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.Profissional;
import com.projetointegrador.agendaonline.model.Servico;
import com.projetointegrador.agendaonline.model.enuns.CanalOrigem;
import com.projetointegrador.agendaonline.model.enuns.StatusAgendamento;
import com.projetointegrador.agendaonline.repository.AgendamentoRepository;
import com.projetointegrador.agendaonline.repository.ClienteRepository;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import com.projetointegrador.agendaonline.repository.ProfissionalRepository;
import com.projetointegrador.agendaonline.repository.ServicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ProfissionalRepository profissionalRepository;
    private final ServicoRepository servicoRepository;
    private final AgendamentoMapper agendamentoMapper;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            EstabelecimentoRepository estabelecimentoRepository,
            ProfissionalRepository profissionalRepository,
            ServicoRepository servicoRepository,
            AgendamentoMapper agendamentoMapper) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.profissionalRepository = profissionalRepository;
        this.servicoRepository = servicoRepository;
        this.agendamentoMapper = agendamentoMapper;
    }

    public AgendamentoResponseDto create(AgendamentoRequestDto request) {
        UUID clienteId = request.getClienteId();
        UUID estabelecimentoId = request.getEstabelecimentoId();
        UUID profissionalId = request.getProfissionalId();
        UUID servicoId = request.getServicoId();
        OffsetDateTime inicio = request.getDataHoraInicio();
        OffsetDateTime fim = request.getDataHoraFim();

        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));

        Estabelecimento estabelecimento = estabelecimentoRepository.findById(estabelecimentoId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Estabelecimento não encontrado."));

        Profissional profissional = profissionalRepository.findById(profissionalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado."));

        Servico servico = servicoRepository.findById(servicoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado."));

        if (!cliente.getEstabelecimento().getId().equals(estabelecimento.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não pertence a este estabelecimento.");
        }

        if (!profissional.getEstabelecimento().getId().equals(estabelecimento.getId())
                || !servico.getEstabelecimento().getId().equals(estabelecimento.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Profissional e serviço devem pertencer ao mesmo estabelecimento.");
        }

        List<Agendamento> conflito = agendamentoRepository.findByProfissionalIdAndDataHoraInicioBetween(
                profissionalId,
                inicio.minusHours(2),
                fim);

        if (!conflito.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Já existe um agendamento nesse horário para este profissional.");
        }

        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);
        agendamento.setEstabelecimento(estabelecimento);
        agendamento.setProfissional(profissional);
        agendamento.setServico(servico);
        agendamento.setDataHoraInicio(inicio);
        agendamento.setDataHoraFim(fim);
        agendamento.setValorCobrado(servico.getPreco());
        agendamento.setObservacao(request.getObservacao());
        agendamento.setStatus(StatusAgendamento.PENDENTE);
        agendamento.setCanalOrigem(CanalOrigem.APP);

        Agendamento salvo = agendamentoRepository.save(agendamento);
        return agendamentoMapper.toDto(salvo);
    }

    public List<AgendamentoResponseDto> findByClienteId(UUID clienteId) {
        clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));

        return agendamentoRepository.findByClienteId(clienteId).stream()
                .map(agendamentoMapper::toDto)
                .collect(Collectors.toList());
    }
}
