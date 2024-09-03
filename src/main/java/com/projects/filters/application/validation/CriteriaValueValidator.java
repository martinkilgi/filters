package com.projects.filters.application.validation;

import com.projects.filters.application.model.dto.CriteriaDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CriteriaValueValidator implements ConstraintValidator<CriteriaValue, CriteriaDto> {
    @Override
    public boolean isValid(CriteriaDto criteriaDto, ConstraintValidatorContext constraintValidatorContext) {
        switch(criteriaDto.getType()) {
            case AMOUNT -> {
                return criteriaDto.getAmountValue() != null;
            }
            case DATE -> {
                return criteriaDto.getDateValue() != null;
            }
            case TITLE -> {
                return criteriaDto.getTitleValue() != null;
            }
        }

        return true;
    }
}
