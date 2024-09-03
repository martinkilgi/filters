package com.projects.filters.application.model.dto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterDto {

    private String name;

    @Valid
    private List<CriteriaDto> criterias;
}
