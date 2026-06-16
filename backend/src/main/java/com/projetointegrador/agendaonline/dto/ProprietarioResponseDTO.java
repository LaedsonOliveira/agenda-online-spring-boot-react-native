package com.projetointegrador.agendaonline.dto;

import lombok.Data;

@Data
public class ProprietarioResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String whatsapp;
}
