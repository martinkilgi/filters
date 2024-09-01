package com.projects.filters.application.mapper;

import com.projects.filters.application.model.FilterEntity;
import com.projects.filters.application.model.dto.FilterDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(uses = {CriteriaMapper.class}, componentModel = "spring")
public interface FilterMapper {

    @Mapping(target = "filterId", ignore = true)
    FilterEntity filterDtoToFilterEntity(FilterDto filterDto);

    FilterDto filterEntityToFilterDto(FilterEntity filterEntity);

    List<FilterDto> filterEntitiesToFilterDtos(List<FilterEntity> filterEntities);

}
