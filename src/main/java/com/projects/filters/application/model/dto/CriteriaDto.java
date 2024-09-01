package com.projects.filters.application.model.dto;

import com.projects.filters.application.model.criteria.CriteriaType;
import com.projects.filters.application.model.criteria.comparator.CriteriaComparator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriteriaDto {
    private CriteriaType type;
    private CriteriaComparator comparator;
    private Long amountValue;
    private Date dateValue;
    private String titleValue;
}
