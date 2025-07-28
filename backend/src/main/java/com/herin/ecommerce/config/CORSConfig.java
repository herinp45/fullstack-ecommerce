package com.herin.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://my-frontendecom-bucket.s3-website.us-east-2.amazonaws.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);  // if sending cookies or Authorization headers
            }
        };
    }
}

