package com.github.Luythen.Dto;
import jakarta.validation.constraints.NotBlank;

public class UserDto {
    @NotBlank(message = "Cannot be empty")
    private String email;
    @NotBlank(message = "Cannot be empty")
    private String password;
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    
}
