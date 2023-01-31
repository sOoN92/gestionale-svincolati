import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const API_URL = 'https://nodejs-app-1xon.onrender.com/api/released/';
// const API_URL = 'http://localhost:3001/api/released/';

@Injectable({
  providedIn: 'root',
})
export class ReleasedService {
  constructor(private http: HttpClient) {}

  getReleased(): Observable<any> {
    return this.http.get(API_URL + 'get').pipe(
      map((res: any) => {
        let released = res?.released?.[0]?.released ?? [];
        if (released.length) {
          released = released.filter((x: any) => !x.name.includes('*'));
        }
        const members = res?.members?.[0]?.members ?? [];

        const result = [...released, ...members];

        let ordering: any = {};
        let sortOrder = ['POR', 'DIF', 'CEN', 'ATT'];
        for (var i = 0; i < sortOrder.length; i++) {
          ordering[sortOrder[i]] = i;
        }

        return result.sort((a, b) => {
          return (
            ordering[a.type] - ordering[b.type] || a.role.localeCompare(b.role)
          );
        });
      })
    );
  }
}
