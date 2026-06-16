package com.projetointegrador.agendaonline.dto;

import lombok.Data;

@Data
public class ClienteResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String whatsapp;
    private String dataNascimento;
    private Long estabelecimentoId;
}
