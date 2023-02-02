import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, tap } from 'rxjs';
import { ReleasedService } from '../_services/released.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  displayedColumns: string[] = ['role', 'name', 'team', 'fantaPoint'];
  displayedTeamColumns: string[] = ['userId', 'totalCredits', 'missing'];
  members = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<{
    _id: string;
    role: string;
    name: string;
    team: string;
    fantaPoint: string;
  }>();

  constructor(
    private releasedService: ReleasedService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.releasedService.getReleased().pipe(
      tap((released: any) => {
        this.dataSource.data = released.result;
        this.members.data = released.teams;
      })
    ).subscribe();
  }
  
}
