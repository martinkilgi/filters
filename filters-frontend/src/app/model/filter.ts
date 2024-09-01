import { Criteria } from "./criteria";

export interface Filter {
    name: string;
    criterias: Criteria[];
}