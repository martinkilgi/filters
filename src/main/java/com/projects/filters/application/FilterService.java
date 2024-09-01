package com.projects.filters.application;

import com.projects.filters.application.mapper.FilterMapper;
import com.projects.filters.application.model.FilterEntity;
import com.projects.filters.application.model.dto.FilterDto;
import com.projects.filters.repository.FilterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilterService {

    private final FilterRepository filterRepository;
    private final FilterMapper filterMapper;

    public List<FilterDto> getFilters() {
        List<FilterEntity> filters = filterRepository.findAll();
        return filterMapper.filterEntitiesToFilterDtos(filters);
    }

    public FilterDto saveFilter(FilterDto filterDto) {
        FilterEntity filterEntity = filterMapper.filterDtoToFilterEntity(filterDto);
        filterRepository.save(filterEntity);
        return filterMapper.filterEntityToFilterDto(filterEntity);
    }

}
