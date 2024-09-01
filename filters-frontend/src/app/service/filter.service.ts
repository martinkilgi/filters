import { Injectable } from '@angular/core';
import { Filter } from '../model/filter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

    headers = {'content-type': 'application/json'};

    constructor(
        private http: HttpClient
    ) { }

    getFilters(): Observable<any> {
        return this.http.get('http://localhost:8080/filters');
    }

    saveFilter(filter: Filter): Observable<any> {
        return this.http.post('http://localhost:8080/filters/save', filter, {'headers': this.headers});
    }

}
