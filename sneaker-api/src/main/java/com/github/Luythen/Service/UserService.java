package com.github.Luythen.Service;

import javax.security.sasl.AuthenticationException;

import com.github.Luythen.Dto.UserDto;
import com.github.Luythen.Entity.User;

import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional(Transactional.TxType.SUPPORTS)
@ApplicationScoped
public class UserService {

    @Inject
    EntityManager em;

    @Transactional(Transactional.TxType.REQUIRED)
    public void createNewUser (User user) throws Exception {
        if (getUserByEmail(user.getEmail()) != null) {
            throw new Exception("Account already exits with that email");
        }

        try {
            em.persist(user);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private User getUserByEmail (String email) {
        try {
            User user = (User) em.createQuery("SELECT u FROM User u WHERE u.email =:email").setParameter("email", email).getSingleResult();
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    public User authenticate (UserDto userDto) throws Exception {
        User user = getUserByEmail(userDto.getEmail());

        if (user == null) {
            throw new AuthenticationException("Can't find a account with this email");
        }

        if (!BcryptUtil.matches(userDto.getPassword(), user.getPasswordHash())) {
            throw new AuthenticationException("Wrong password");
        }

        return user;
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public User getUserByID (String id) throws Exception {
        try {
            User user = em.find(User.class, id);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

}
