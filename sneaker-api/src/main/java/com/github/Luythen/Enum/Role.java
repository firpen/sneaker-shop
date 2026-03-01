package com.github.Luythen.Enum;

public enum Role {
    Admin("Admin"),
    User("User");

    private String desc;
    
    private Role (String desc) {
        this.desc = desc;
    }

    public String getDesc () {
        return this.desc;
    }

     

}
