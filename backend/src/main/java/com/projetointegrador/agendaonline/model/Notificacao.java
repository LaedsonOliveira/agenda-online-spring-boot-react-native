package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.CanalNotificacao;
import com.projetointegrador.agendaonline.model.enuns.StatusEnvio;
import com.projetointegrador.agendaonline.model.enuns.TipoNotificacao;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "notificacao")
@Getter
@Setter
public class Notificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "estabelecimento_id")
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    private TipoNotificacao tipo;

    @Enumerated(EnumType.STRING)
    private CanalNotificacao canal;

    @Enumerated(EnumType.STRING)
    private StatusEnvio statusEnvio;

    private OffsetDateTime agendadoPara;
    private OffsetDateTime enviadoEm;
}
