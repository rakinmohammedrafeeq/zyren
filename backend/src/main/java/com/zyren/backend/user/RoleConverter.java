package com.zyren.backend.user;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<Role, String> {

    @Override
    public String convertToDatabaseColumn(Role role) {
        return role != null ? role.name() : Role.USER.name();
    }

    @Override
    public Role convertToEntityAttribute(String dbData) {
        return Role.fromString(dbData);
    }
}
