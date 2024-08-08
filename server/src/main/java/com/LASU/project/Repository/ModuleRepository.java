package com.LASU.project.Repository;

import com.LASU.project.Entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long>
{
    @Query("SELECT m FROM Module m WHERE m.title LIKE %:keyword%")
    List<Module> findByModule(@Param("keyword") String keyword);
}
