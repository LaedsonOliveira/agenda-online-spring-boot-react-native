package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.DirecaoMensagem;
import com.projetointegrador.agendaonline.model.enuns.TipoMidia;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "mensagem_log")
@Getter
@Setter
public class MensagemLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "conversa_id")
    private ConversaWhatsapp conversa;

    @Enumerated(EnumType.STRING)
    private DirecaoMensagem direcao;

    @Column(nullable = false)
    private String conteudo;

    @Enumerated(EnumType.STRING)
    private TipoMidia tipoMidia = TipoMidia.TEXTO;

    @CreationTimestamp
    private OffsetDateTime enviadoEm;
}