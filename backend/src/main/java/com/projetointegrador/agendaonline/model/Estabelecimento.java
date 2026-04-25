package com.projetointegrador.agendaonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.projetointegrador.agendaonline.model.enuns.TipoNegocio;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "estabelecimento")
@Getter
@Setter
public class Estabelecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_negocio", nullable = false)
    private TipoNegocio tipoNegocio;

    @Column(unique = true, length = 18)
    private String cnpj;

    private String telefone;
    private String whatsapp;
    private String email;
    private String endereco;

    private Boolean ativo = true;

    @CreationTimestamp
    private OffsetDateTime criadoEm;
}
