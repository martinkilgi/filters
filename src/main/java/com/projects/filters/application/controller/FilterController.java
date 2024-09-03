package com.projects.filters.application.controller;

import com.projects.filters.application.FilterService;
import com.projects.filters.application.model.dto.FilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/filters")
@RequiredArgsConstructor
public class FilterController {

    private final FilterService filterService;

    @GetMapping
    public ResponseEntity<List<FilterDto>> getFilters() {
        return ResponseEntity.ok().body(filterService.getFilters());
    }

    @PostMapping("/save")
    public ResponseEntity<FilterDto> saveFilter(@Valid @RequestBody FilterDto filterDto) {
        return ResponseEntity.ok().body(filterService.saveFilter(filterDto));
    }
}
