package com.github.Luythen.Service;

import java.util.List;

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

    public Product getProductById(int id) {
        try {
            return em.find(Product.class, id);
        } catch (Exception e) {
            return null;
        }
    }

    public List<Product> getAllProducts() {
        try {
            return em.createQuery("SELECT p FROM Product p", Product.class).getResultList();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Product updateProduct(int id, Product updatedProduct) throws Exception {
        Product product = getProductById(id);
        if (product == null) {
            throw new Exception("Product not found");
        }
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setCategory(updatedProduct.getCategory());

        return product;
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public boolean deleteProduct(int id) throws Exception {
        Product product = getProductById(id);
        if (product == null) {
            throw new Exception("Product not found");
        }
        try {
            em.remove(product);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}