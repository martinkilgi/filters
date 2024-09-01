import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Criteria } from '../../model/criteria';
import { CriteriaType } from '../../model/criteria-type';
import { CriteriaComparator } from '../../model/criteria-comparator';
import { SaveableCriteria } from '../../model/saveable-criteria';
import { Filter } from '../../model/filter';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.scss'
})
export class AddFilterComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);

  CriteriaType = CriteriaType;
  CriteriaComparator = CriteriaComparator;

  filterForm: FormGroup;
  criterias: SaveableCriteria[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterName: this.formBuilder.control('', [Validators.required]),
      criterias: this.formBuilder.array([
        this.formBuilder.group({
          type: this.formBuilder.control(CriteriaType[CriteriaType.AMOUNT], [Validators.required]),
          comparator: this.formBuilder.control(CriteriaComparator.MORE_THAN, [Validators.required]),
          value: this.formBuilder.control(4, [Validators.required])
        })
      ])
    })

  }

  get criteriasArray() {
    return <FormArray>this.filterForm.get('criterias');
  }

  getCurrentCriteriaType(index: number) {
    return (this.filterForm.get('criterias') as FormArray).at(index).get('type')?.value;
  }

  criteriaTypeSelected(index: number, criteria: Criteria): void {
    if (criteria.type.toString() === CriteriaType[CriteriaType.AMOUNT]) {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.MORE_THAN);
    } else if (criteria.type.toString() === CriteriaType[CriteriaType.TITLE]) {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.STARTS_WITH);
    } else {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.FROM);
    }
  }

  addCriteriaRow(): void {
    const newCriteria = this.formBuilder.group({
      type: this.formBuilder.control(CriteriaType[CriteriaType.AMOUNT], [Validators.required]),
      comparator: this.formBuilder.control(CriteriaComparator.MORE_THAN, [Validators.required]),
      value: this.formBuilder.control(4, [Validators.required])
    });

    this.criteriasArray.controls.push(newCriteria);
  }

  removeCriteriaRow(index: number): void {
    let formArray: FormArray = this.filterForm.get('criterias') as FormArray;
    formArray.removeAt(index);
  }

  saveFilter(): void {
    const criteriasFormArray: FormArray = this.filterForm.get('criterias') as FormArray;
    const saveableCriterias: SaveableCriteria[] = (criteriasFormArray.controls as FormControl[]).map((control: FormControl) => control.value);

    const criterias = saveableCriterias.map(criteria => {
      return <Criteria>{
        type: criteria.type,
        comparator: criteria.comparator,
        ...(criteria.type.toString() === CriteriaType[CriteriaType.AMOUNT] ? { amountValue: criteria.value } : {}),
        ...(criteria.type.toString() === CriteriaType[CriteriaType.TITLE] ? { titleValue: criteria.value } : {}),
        ...(criteria.type.toString() === CriteriaType[CriteriaType.DATE] ? { dateValue: criteria.value } : {}),
      };
    })

    const saveableFilter: Filter = {
      name: this.filterForm.get('filterName')?.value,
      criterias: criterias
    }

    this.filterService.saveFilter(saveableFilter).subscribe({
      next: () => {
        this._snackBar.open("Filter saved!");
      },
      error: () => {
        this._snackBar.open("Error occured when saving a filter!");
      }
    });
  }

}
