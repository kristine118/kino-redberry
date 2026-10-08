import { HttpClient, HttpParams } from "@angular/common/http";
import {  inject, Injectable } from "@angular/core";
import { SessionFilters } from "../interfaces/session-filters";
import { SessionResponse } from "../interfaces/session-response";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private http = inject(HttpClient);

    getSession(filters: SessionFilters){
        let params = new HttpParams();

        if (filters.date) params = params.set('date', filters.date);
        if (filters.sort) params = params.set('sort', filters.sort);
        if (filters.page) params = params.set('page', String(filters.page));

        filters.venues?.forEach(v => params = params.append('venues[]', v));
        filters.formats?.forEach(f => params = params.append('formats[]', f));
        filters.languages?.forEach(l => params = params.append('languages[]', l));
        filters.bands?.forEach(b => params = params.append('bands[]', b));


        return this.http.get<SessionResponse>(`${environment.apiUrl}/sessions`, {params});
    }


}
