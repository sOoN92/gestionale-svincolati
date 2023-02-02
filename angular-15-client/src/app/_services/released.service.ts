import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const API_URL = 'https://nodejs-app-1xon.onrender.com/api/released/';
@Injectable({
  providedIn: 'root',
})
export class ReleasedService {
  constructor(private http: HttpClient) {}

  findMissingMember(userId: string, members: any) {
    const filteredMember = members.filter((x: any) => x.userId === userId);
    let missing: any = [];
    if (filteredMember.length > 0) {
      missing = filteredMember[0].members.map((m: any) => ({
        [m.role]: filteredMember[0].members.filter(
          (x: any) => x.role === m.role
        ).length,
      }));
    }
    return Object.assign.apply(Object, missing);
  }

  getReleased(): Observable<any> {
    return this.http.get(API_URL + 'get').pipe(
      map((res: any) => {
        let released = res?.released?.[0]?.released ?? [];
        if (released.length) {
          released = released.filter((x: any) => !x.name.includes('*'));
        }
        const members = res?.members?.flatMap((x: any) => x.members) || [];

        const result = [...released, ...members];

        const teams =
          res?.members?.flatMap((x: any) => ({
            userId: x.userId,
            totalCredits: x.totalCredits,
            missing: this.findMissingMember(x.userId, res?.members ?? []),
          })) || [];

        let ordering: any = {};
        let sortOrder = ['POR', 'DIF', 'CEN', 'ATT'];
        for (var i = 0; i < sortOrder.length; i++) {
          ordering[sortOrder[i]] = i;
        }

        return {
          result: result.sort((a, b) => {
            return (
              ordering[a.type] - ordering[b.type] ||
              a.role.localeCompare(b.role)
            );
          }),
          teams: teams ?? [],
        };
      })
    );
  }
}
