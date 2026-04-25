package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.StatusConversa;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "conversa_whatsapp")
@Getter
@Setter
public class ConversaWhatsapp {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "estabelecimento_id")
    private Estabelecimento estabelecimento;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String numeroWhatsapp;

    @Enumerated(EnumType.STRING)
    private StatusConversa status;

    @Column(columnDefinition = "jsonb")
    private String contextoJson;

    private OffsetDateTime ultimaMensagem;

    @CreationTimestamp
    private OffsetDateTime iniciadoEm;
}