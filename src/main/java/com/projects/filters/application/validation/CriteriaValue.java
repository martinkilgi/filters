package com.projects.filters.application.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CriteriaValueValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CriteriaValue {
    String message() default "Criteria type matching value is missing";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
