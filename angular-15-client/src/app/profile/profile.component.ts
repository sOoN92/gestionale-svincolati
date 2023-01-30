import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_model/squad.model';
import { SquadService } from '../_services/squad.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  releasedMember: Observable<Member[]>;

  constructor(private storageService: StorageService, private squadService: SquadService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.releasedMember = this.squadService.getReleasedMember();
  }
}
