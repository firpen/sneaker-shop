package com.github.Luythen.Dto;

import jakarta.validation.constraints.NotBlank;

public class StripeSessionDto {

    @NotBlank
    private String sessionID;

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }
    
}
