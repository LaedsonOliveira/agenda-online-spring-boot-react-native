package com.projetointegrador.agendaonline.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.UUID;

public class AgendamentoRequestDto {

    @NotNull
    private UUID clienteId;

    @NotNull
    private UUID estabelecimentoId;

    @NotNull
    private UUID profissionalId;

    @NotNull
    private UUID servicoId;

    @NotNull
    private OffsetDateTime dataHoraInicio;

    @NotNull
    private OffsetDateTime dataHoraFim;

    private String observacao;

    public UUID getClienteId() {
        return clienteId;
    }

    public void setClienteId(UUID clienteId) {
        this.clienteId = clienteId;
    }

    public UUID getEstabelecimentoId() {
        return estabelecimentoId;
    }

    public void setEstabelecimentoId(UUID estabelecimentoId) {
        this.estabelecimentoId = estabelecimentoId;
    }

    public UUID getProfissionalId() {
        return profissionalId;
    }

    public void setProfissionalId(UUID profissionalId) {
        this.profissionalId = profissionalId;
    }

    public UUID getServicoId() {
        return servicoId;
    }

    public void setServicoId(UUID servicoId) {
        this.servicoId = servicoId;
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

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}
