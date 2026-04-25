package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "cliente")
@Getter
@Setter
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "estabelecimento_id")
    private Estabelecimento estabelecimento;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String whatsapp;

    private String email;
    private LocalDate dataNascimento;

    private Integer totalAgendamentos = 0;
    private LocalDate ultimaVisita;

    private Boolean bloqueado = false;

    @CreationTimestamp
    private OffsetDateTime criadoEm;
}
