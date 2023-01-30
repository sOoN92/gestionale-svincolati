import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Member, Squad } from '../_model/squad.model';

const API_URL = 'https://nodejs-app-1xon.onrender.com/api/squad/';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  constructor(private http: HttpClient) {}

  getSquad(): Observable<Squad> {
    return this.http.get(API_URL + 'user').pipe(map((res: any) => res.squad[0]));
  }

  getReleasedMember(): Observable<Member[]> {
    return this.http.get(API_URL + 'user').pipe(map((res: any) => res.squad[0].members.filter((x: Member) => x.released)));
  }

  releaseMember(body: { id: string, credits: number }): Observable<any> {
    return this.http.post(API_URL + 'release', body);
  }
  
}
