package com.main.server.auth.oauth;

import java.util.Map;

public class GoogleOAuth2UserInfo {

    protected Map<String, Object> attributes;

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getId() {
        return (String) attributes.get("sub");
    }

    public String getName() {
        return (String) attributes.get("name");
    }

    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getLocation() {
        return (String) attributes.get("locale");
    }
}
