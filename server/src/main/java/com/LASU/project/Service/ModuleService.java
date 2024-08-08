package com.LASU.project.Service;

import com.LASU.project.Entity.Module;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ModuleService {

    void saveModule(Module module, MultipartFile documents) throws IOException;

    List<Module> searchModules(String keyword) throws IOException;

    List<Module> findAllModule()throws IOException;

    void deleteById (Long id) throws GeneralException;
}
