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
}
