package com.projetointegrador.agendaonline.dto;

import com.projetointegrador.agendaonline.model.enuns.TipoNegocio;
import lombok.Data;

@Data
public class EstabelecimentoResponseDTO {
    private Long id;
    private String nome;
    private String endereco;
    private String telefone;
    private String whatsapp;
    private String email;
    private TipoNegocio tipoNegocio;
    private Long proprietarioId;
}
