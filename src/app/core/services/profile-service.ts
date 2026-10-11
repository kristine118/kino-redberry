import { Injectable,inject, } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profile } from '../interfaces/profile';
import { UpdateProfileBody } from '../interfaces/update-profile-body';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/profile`;

  updateProfile(body: UpdateProfileBody) {
    return this.http.put<{ data: Profile }>(this.url, body).pipe(map((r) => r.data));
  }
}
