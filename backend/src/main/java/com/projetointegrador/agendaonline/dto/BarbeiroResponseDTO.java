package com.projetointegrador.agendaonline.dto;

import com.projetointegrador.agendaonline.model.enuns.StatusOperacional;

public class BarbeiroResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String especialidade;
    private String fotoUrl;
    private StatusOperacional statusOperacional;
    private Long estabelecimentoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public StatusOperacional getStatusOperacional() {
        return statusOperacional;
    }

    public void setStatusOperacional(StatusOperacional statusOperacional) {
        this.statusOperacional = statusOperacional;
    }

    public Long getEstabelecimentoId() {
        return estabelecimentoId;
    }

    public void setEstabelecimentoId(Long estabelecimentoId) {
        this.estabelecimentoId = estabelecimentoId;
    }
}
