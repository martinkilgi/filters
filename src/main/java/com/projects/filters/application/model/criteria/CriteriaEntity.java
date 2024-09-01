package com.projects.filters.application.model.criteria;

import com.projects.filters.application.model.criteria.comparator.CriteriaComparator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "criteria")
public class CriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer criteriaId;

    @Enumerated(EnumType.STRING)
    private CriteriaType type;

    @Enumerated(EnumType.STRING)
    private CriteriaComparator comparator;

    @Column(name = "date_value")
    private Date dateValue;

    @Column(name = "amount_value")
    private Long amountValue;

    @Column(name = "title_value")
    private String titleValue;
}
