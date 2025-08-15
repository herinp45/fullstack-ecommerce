package com.herin.ecommerce.service;
import org.springframework.core.io.InputStreamResource;

import java.io.InputStream;


public class MultipartInputStreamFileResource extends InputStreamResource {
    private final String filename;

    /**
     * Constructor for MultipartInputStreamFileResource
     * @param inputStream InputStream to be wrapped as a resource
     * @param filename Name of the file to be used in the resource
     */
    public MultipartInputStreamFileResource(InputStream inputStream, String filename) {
        super(inputStream);
        this.filename = filename;
    }

    /**
     * Get the filename of the resource
     * @return String representing the filename
     */
    @Override
    public String getFilename() {
        return filename;
    }

    /**
     * Get the content type of the resource
     * @return String representing the content type, defaulting to "application/octet-stream"
     */
    public long contentLength() {
        try {
            return getInputStream().available();
        } catch (Exception e) {
            return -1; // Return -1 if the length cannot be determined
        }
    }

}
