import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  currentPage = 0;
  rooms = [];
  total: any;
  loading = false;

  constructor(private userService: UserService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.userService.getRooms(this.currentPage+1).subscribe(response => {
      console.log(response);
      this.rooms = response.rooms;
      this.total = response.totalRooms;
    })
  }

  pageIndexChange(event: PageEvent) {
    console.log(event)
    this.currentPage = event.pageIndex;
    this.getRooms();
  }

}
