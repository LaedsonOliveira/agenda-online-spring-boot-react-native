package com.projetointegrador.agendaonline.model;

import com.projetointegrador.agendaonline.model.enuns.DiaSemana;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Table(name = "horarios_disponiveis")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HorarioDisponivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "barbeiro_id")
    private Barbeiro barbeiro;

    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;

    private LocalTime horarioInicio;
    private LocalTime horarioFim;
}
