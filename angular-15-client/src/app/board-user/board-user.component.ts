import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable } from 'rxjs';
import { Member, Squad } from '../_model/squad.model';
import { SquadService } from '../_services/squad.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss'],
})
export class BoardUserComponent implements OnInit {
  displayedColumns: string[] = ['role', 'name', 'team', 'price', 'release'];
  dataSource = new MatTableDataSource<Member>();
  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<Member>(
    this.allowMultiSelect,
    this.initialSelection
  );
  content: Squad;
  currentUser: any;

  constructor(private storageService: StorageService, private squadService: SquadService) {}

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.squadService.getSquad().subscribe((squad) => {
      this.content = squad;
      this.dataSource.data = squad.members.filter(x => !x.released);
    });
  }

  select(row: Member) {
    this.selection.toggle(row);
  }

  releasePlayer() {
    const player = this.selection.selected?.[0];
    if (!!player) {
      this.squadService.releaseMember({id: player._id, credits: player.recoveredCredits}).subscribe((squad: Squad) => {
        this.content = squad;
        this.dataSource.data = squad.members.filter((x: Member) => !x.released);
      });
    }
  }
}
