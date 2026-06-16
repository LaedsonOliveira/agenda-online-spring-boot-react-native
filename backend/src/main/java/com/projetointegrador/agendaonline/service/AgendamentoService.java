package com.projetointegrador.agendaonline.service;

import com.projetointegrador.agendaonline.dto.AgendamentoRequestDTO;
import com.projetointegrador.agendaonline.dto.AgendamentoResponseDTO;
import com.projetointegrador.agendaonline.model.Agendamento;
import com.projetointegrador.agendaonline.model.Barbeiro;
import com.projetointegrador.agendaonline.model.Cliente;
import com.projetointegrador.agendaonline.model.Estabelecimento;
import com.projetointegrador.agendaonline.model.Servico;
import com.projetointegrador.agendaonline.model.enuns.AgendamentoStatus;
import com.projetointegrador.agendaonline.model.enuns.OrigemAgendamento;
import com.projetointegrador.agendaonline.repository.AgendamentoRepository;
import com.projetointegrador.agendaonline.repository.ClienteRepository;
import com.projetointegrador.agendaonline.repository.BarbeiroRepository;
import com.projetointegrador.agendaonline.repository.EstabelecimentoRepository;
import com.projetointegrador.agendaonline.repository.ServicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository,
            ServicoRepository servicoRepository,
            EstabelecimentoRepository estabelecimentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
    }

    public List<AgendamentoResponseDTO> listar(Long clienteId, Long barbeiroId) {
        return agendamentoRepository.findAll().stream()
                .filter(a -> clienteId == null || a.getCliente() == null || clienteId.equals(a.getCliente().getId()))
                .filter(a -> barbeiroId == null || a.getBarbeiro() == null
                        || barbeiroId.equals(a.getBarbeiro().getId()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado"));

        Barbeiro barbeiro = barbeiroRepository.findById(dto.getBarbeiroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Barbeiro não encontrado"));

        Servico servico = servicoRepository.findById(dto.getServicoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Serviço não encontrado"));

        Estabelecimento estabelecimento = estabelecimentoRepository.findById(dto.getEstabelecimentoId())
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estabelecimento não encontrado"));

        LocalDateTime inicio = LocalDateTime.of(
                LocalDate.parse(dto.getData()),
                LocalTime.parse(dto.getHorario()));

        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);
        agendamento.setBarbeiro(barbeiro);
        agendamento.setServico(servico);
        agendamento.setEstabelecimento(estabelecimento);
        agendamento.setInicio(inicio);
        agendamento.setValor(servico.getPrecoBase());
        agendamento.setStatus(AgendamentoStatus.PENDENTE);
        agendamento.setOrigem(
                dto.getOrigem() != null ? OrigemAgendamento.valueOf(dto.getOrigem()) : OrigemAgendamento.APLICATIVO);

        Agendamento salvo = agendamentoRepository.save(agendamento);
        return toResponse(salvo);
    }

    public AgendamentoResponseDTO atualizarStatus(Long id, String status) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agendamento não encontrado"));

        agendamento.setStatus(AgendamentoStatus.valueOf(status));
        return toResponse(agendamentoRepository.save(agendamento));
    }

    private AgendamentoResponseDTO toResponse(Agendamento agendamento) {
        AgendamentoResponseDTO dto = new AgendamentoResponseDTO();
        dto.setId(agendamento.getId());
        dto.setData(agendamento.getInicio().toLocalDate().toString());
        dto.setHorario(agendamento.getInicio().toLocalTime().toString());
        dto.setStatus(agendamento.getStatus());
        dto.setOrigem(agendamento.getOrigem());
        dto.setValor(agendamento.getValor());
        dto.setClienteId(agendamento.getCliente() != null ? agendamento.getCliente().getId() : null);
        dto.setBarbeiroId(agendamento.getBarbeiro() != null ? agendamento.getBarbeiro().getId() : null);
        dto.setServicoId(agendamento.getServico() != null ? agendamento.getServico().getId() : null);
        dto.setEstabelecimentoId(
                agendamento.getEstabelecimento() != null ? agendamento.getEstabelecimento().getId() : null);
        dto.setCriadoEm(agendamento.getCriadoEm() != null ? agendamento.getCriadoEm().toString() : null);
        return dto;
    }
}
