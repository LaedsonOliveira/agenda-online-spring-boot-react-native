package com.projetointegrador.agendaonline.dto;

import com.projetointegrador.agendaonline.model.enuns.TipoNegocio;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EstabelecimentoRequestDTO {

    @NotBlank
    private String nome;

    @NotBlank
    private String endereco;

    private String telefone;
    private String whatsapp;
    private String email;

    @NotNull
    private TipoNegocio tipoNegocio;

    private Long proprietarioId;
}
