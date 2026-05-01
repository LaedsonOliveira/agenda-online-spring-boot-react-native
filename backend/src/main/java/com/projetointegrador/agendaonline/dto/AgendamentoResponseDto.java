package com.projetointegrador.agendaonline.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public class AgendamentoResponseDto {

    private UUID id;
    private UUID clienteId;
    private String clienteNome;
    private UUID estabelecimentoId;
    private String estabelecimentoNome;
    private UUID profissionalId;
    private String profissionalNome;
    private UUID servicoId;
    private String servicoNome;
    private String status;
    private OffsetDateTime dataHoraInicio;
    private OffsetDateTime dataHoraFim;
    private BigDecimal valorCobrado;
    private String observacao;
    private OffsetDateTime criadoEm;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getClienteId() {
        return clienteId;
    }

    public void setClienteId(UUID clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public UUID getEstabelecimentoId() {
        return estabelecimentoId;
    }

    public void setEstabelecimentoId(UUID estabelecimentoId) {
        this.estabelecimentoId = estabelecimentoId;
    }

    public String getEstabelecimentoNome() {
        return estabelecimentoNome;
    }

    public void setEstabelecimentoNome(String estabelecimentoNome) {
        this.estabelecimentoNome = estabelecimentoNome;
    }

    public UUID getProfissionalId() {
        return profissionalId;
    }

    public void setProfissionalId(UUID profissionalId) {
        this.profissionalId = profissionalId;
    }

    public String getProfissionalNome() {
        return profissionalNome;
    }

    public void setProfissionalNome(String profissionalNome) {
        this.profissionalNome = profissionalNome;
    }

    public UUID getServicoId() {
        return servicoId;
    }

    public void setServicoId(UUID servicoId) {
        this.servicoId = servicoId;
    }

    public String getServicoNome() {
        return servicoNome;
    }

    public void setServicoNome(String servicoNome) {
        this.servicoNome = servicoNome;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public void setDataHoraInicio(OffsetDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }

    public OffsetDateTime getDataHoraFim() {
        return dataHoraFim;
    }

    public void setDataHoraFim(OffsetDateTime dataHoraFim) {
        this.dataHoraFim = dataHoraFim;
    }

    public BigDecimal getValorCobrado() {
        return valorCobrado;
    }

    public void setValorCobrado(BigDecimal valorCobrado) {
        this.valorCobrado = valorCobrado;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public OffsetDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(OffsetDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}
