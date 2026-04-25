package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.DiaSemana;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "horario_disponivel")
@Getter
@Setter
public class HorarioDisponivel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;

    private LocalTime horaInicio;
    private LocalTime horaFim;

    private Boolean ativo = true;
}