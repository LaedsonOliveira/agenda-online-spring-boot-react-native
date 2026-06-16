package com.projetointegrador.agendaonline.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClienteLoginDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String senha;
}
