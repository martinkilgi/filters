import { CriteriaComparator } from "./criteria-comparator";
import { CriteriaType } from "./criteria-type";

export interface Criteria {
    type: CriteriaType;
    comparator: CriteriaComparator;
    amountValue?: number;
    dateValue?: string;
    titleValue?: string;
}