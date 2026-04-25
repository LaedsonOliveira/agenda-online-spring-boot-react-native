package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "config_agente")
@Getter
@Setter
public class ConfigAgente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(optional = false)
    @JoinColumn(name = "estabelecimento_id", unique = true)
    private Estabelecimento estabelecimento;

    private String nomeAgente;

    private String saudacao;

    @Column(columnDefinition = "jsonb")
    private String horarioAtendimento;

    private Integer lembreteHorasAntes = 24;

    private Boolean lembreteAtivo = true;

    private String webhookN8nUrl;

    @UpdateTimestamp
    private OffsetDateTime atualizadoEm;
}