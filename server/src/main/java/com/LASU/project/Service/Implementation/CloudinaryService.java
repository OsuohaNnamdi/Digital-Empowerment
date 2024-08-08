package com.LASU.project.Service.Implementation;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {


    private final Cloudinary cloudinary;

    public CloudinaryService (Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public Map upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary
                .uploader()
                .upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult;
    }

    public String getUrl(String publicId) {
        return cloudinary.url().generate(publicId);
    }

    public Map delete(String publicId) throws IOException {
        Map deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return deleteResult;
    }

    public Map update(MultipartFile file, String oldPublicId) throws IOException {

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "invalidate", true, // Invalidate cached versions
                "public_id", oldPublicId // Use the same public_id to overwrite the existing image
        ));
        return uploadResult;
    }
}

