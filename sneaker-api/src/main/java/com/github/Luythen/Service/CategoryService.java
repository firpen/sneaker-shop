package com.github.Luythen.Service;

import java.util.List;

import com.github.Luythen.Entity.Category;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional
@ApplicationScoped
public class CategoryService {

    @Inject
    EntityManager em;

    public List<Category> getAllCategories() {
        return em.createQuery("SELECT c FROM Category c", Category.class).getResultList();
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Category createCategory(String name) {
        Category category = new Category();
        category.setName(name);
        em.persist(category);
        return category;
    }

    public Category getCategoryById(Long id) {
        return em.find(Category.class, id);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void deleteCategory(Long id) {
        Category category = em.find(Category.class, id);
        if (category != null) {
            em.remove(category);
        }
    }
}
