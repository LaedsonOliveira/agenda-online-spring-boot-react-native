package com.projetointegrador.agendaonline.model;

import com.projetointegrador.agendaonline.model.enuns.BloqueioTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "bloqueios_agenda")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BloqueioAgenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "barbeiro_id")
    private Barbeiro barbeiro;

    @Enumerated(EnumType.STRING)
    private BloqueioTipo tipo;

    private LocalDateTime inicio;
    private LocalDateTime fim;
    private String motivo;
}
