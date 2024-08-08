package com.LASU.project.Controller;

import com.LASU.project.Entity.Module;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping
    public ResponseEntity<Void> createModule(@RequestBody Module module, @RequestParam("documents") MultipartFile documents) {
        try {
            moduleService.saveModule(module, documents);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        try {
            return ResponseEntity.ok(moduleService.findAllModule());
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Module>> searchModules(@RequestParam String keyword) {
        try {
            return ResponseEntity.ok(moduleService.searchModules(keyword));
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        try {
            moduleService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
