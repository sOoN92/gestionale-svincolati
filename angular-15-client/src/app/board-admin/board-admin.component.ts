import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReleasedService } from '../_services/released.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  displayedColumns: string[] = ['role', 'name', 'team', 'fantaPoint'];
  dataSource = new MatTableDataSource<{_id:string, role: string, name: string; team: string; fantaPoint: string}>();

  constructor(private releasedService: ReleasedService) { }

  ngOnInit(): void {
    this.releasedService.getReleased().subscribe((released) => {
      this.dataSource.data = released;
    });
  }
}
