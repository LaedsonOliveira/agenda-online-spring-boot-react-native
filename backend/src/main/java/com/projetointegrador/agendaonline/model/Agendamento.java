package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.CanalOrigem;
import com.projetointegrador.agendaonline.model.enuns.StatusAgendamento;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "agendamento")
@Getter
@Setter
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private Estabelecimento estabelecimento;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Profissional profissional;

    @ManyToOne
    private Servico servico;

    private OffsetDateTime dataHoraInicio;
    private OffsetDateTime dataHoraFim;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    @Enumerated(EnumType.STRING)
    private CanalOrigem canalOrigem;

    private BigDecimal valorCobrado;

    private String observacao;

    @CreationTimestamp
    private OffsetDateTime criadoEm;

    public Estabelecimento getEstabelecimento() {
        return estabelecimento;
    }

    public void setEstabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }
}
