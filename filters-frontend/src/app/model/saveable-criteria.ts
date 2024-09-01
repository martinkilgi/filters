import { CriteriaComparator } from "./criteria-comparator";
import { CriteriaType } from "./criteria-type";

export interface SaveableCriteria {
    type: CriteriaType;
    comparator: CriteriaComparator;
    value: string | number;
}