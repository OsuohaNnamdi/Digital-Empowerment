package com.LASU.project.Service.Implementation;


import com.LASU.project.Entity.Module;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.ModuleRepository;
import com.LASU.project.Service.ModuleService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public class ModuleImplementation implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final CloudinaryService cloudinaryService;

    public ModuleImplementation(ModuleRepository moduleRepository, CloudinaryService cloudinaryService) {
        this.moduleRepository = moduleRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public void saveModule(Module module, MultipartFile documents) throws IOException {

        String response = cloudinaryService.upload(documents).toString();
        module.setLink(response);
        moduleRepository.save(module);
    }



    @Override
    public List<Module> findAllModule() throws IOException {
        try {
            return moduleRepository.findAll();
        } catch (GeneralException e) {
            throw new IOException("Error retrieving Module", e);
        }
    }

    @Override
    public List<Module> searchModules(String keyword) throws IOException {
        return moduleRepository.findByModule(keyword);

    }

    @Override
    public void deleteById(Long id) throws GeneralException {

        moduleRepository.deleteById(id);
    }

}
