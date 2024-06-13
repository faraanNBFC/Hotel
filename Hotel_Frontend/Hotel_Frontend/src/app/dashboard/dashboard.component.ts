import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  currentPage = 0;
  rooms = [];
  total: any;
  loading = false;
  responseMessage: any;

  constructor(private userService: UserService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAvailableRooms();
  }

  getAvailableRooms() {
    this.userService.getAvailableRooms(this.currentPage + 1).subscribe(response => {
      console.log(response);
      this.rooms = response.availableRooms;
      this.total = response.totalAvailableRooms;
    })
  }

  pageIndexChange(event: PageEvent) {
    console.log(event)
    this.currentPage = event.pageIndex;
    this.getAvailableRooms();
  }
      
}
