package com.zyren.backend.media;

public class MediaUploadResponse {
    private final String secureUrl;
    private final String publicId;
    private final String resourceType;

    public MediaUploadResponse(String secureUrl, String publicId, String resourceType) {
        this.secureUrl = secureUrl;
        this.publicId = publicId;
        this.resourceType = resourceType;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public String getPublicId() {
        return publicId;
    }

    public String getResourceType() {
        return resourceType;
    }
}

