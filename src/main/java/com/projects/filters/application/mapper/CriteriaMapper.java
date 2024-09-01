package com.projects.filters.application.mapper;

import com.projects.filters.application.model.criteria.*;
import com.projects.filters.application.model.dto.CriteriaDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface CriteriaMapper {

    CriteriaDto toCriteriaDto(CriteriaEntity criteriaEntity);

}
