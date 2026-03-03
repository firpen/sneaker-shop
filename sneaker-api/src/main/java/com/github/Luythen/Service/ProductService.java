package com.github.Luythen.Service;

import com.github.Luythen.Entity.Product;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional(Transactional.TxType.SUPPORTS)
@ApplicationScoped
public class ProductService {

    @Inject
    EntityManager em;

    public Product getProductByName(String name) {
        try {
            return em.createQuery("SELECT p FROM Product p WHERE p.name = :name", Product.class)
                    .setParameter("name", name)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void createProduct(Product product) throws Exception {
        if (getProductByName(product.getName()) != null) {
            throw new Exception("Product with that name already exists");
        }
        try {
            em.persist(product);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
