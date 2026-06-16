package com.projetointegrador.agendaonline.dto;

import com.projetointegrador.agendaonline.model.enuns.AgendamentoStatus;
import com.projetointegrador.agendaonline.model.enuns.OrigemAgendamento;

import java.math.BigDecimal;

public class AgendamentoResponseDTO {

    private Long id;
    private String data;
    private String horario;
    private AgendamentoStatus status;
    private OrigemAgendamento origem;
    private BigDecimal valor;
    private Long clienteId;
    private Long barbeiroId;
    private Long servicoId;
    private Long estabelecimentoId;
    private String criadoEm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public AgendamentoStatus getStatus() {
        return status;
    }

    public void setStatus(AgendamentoStatus status) {
        this.status = status;
    }

    public OrigemAgendamento getOrigem() {
        return origem;
    }

    public void setOrigem(OrigemAgendamento origem) {
        this.origem = origem;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getBarbeiroId() {
        return barbeiroId;
    }

    public void setBarbeiroId(Long barbeiroId) {
        this.barbeiroId = barbeiroId;
    }

    public Long getServicoId() {
        return servicoId;
    }

    public void setServicoId(Long servicoId) {
        this.servicoId = servicoId;
    }

    public Long getEstabelecimentoId() {
        return estabelecimentoId;
    }

    public void setEstabelecimentoId(Long estabelecimentoId) {
        this.estabelecimentoId = estabelecimentoId;
    }

    public String getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(String criadoEm) {
        this.criadoEm = criadoEm;
    }
}
