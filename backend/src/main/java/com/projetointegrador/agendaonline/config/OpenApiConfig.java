package com.projetointegrador.agendaonline.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI agendaOnlineOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Agenda Online - API de Cliente")
                        .description("API para clientes de barbearia efetuarem login e agendamento em estabelecimentos")
                        .version("v1")
                        .license(new License().name("MIT").url("https://opensource.org/licenses/MIT")))
                .externalDocs(new ExternalDocumentation()
                        .description("Documentação da API")
                        .url("https://swagger.io/docs/"));
    }
}
