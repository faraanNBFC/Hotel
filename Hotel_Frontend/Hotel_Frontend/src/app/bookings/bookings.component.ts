import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {

  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  currentPage = 0;
  reservations = [];
  total: any;
  loading = false;
  responseMessage: any;
  displayedColumns: string[] = ['roomName', 'roomType', 'checkInDate', 'checkOutDate', 'price', 'status'];

  constructor(private userService: UserService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserReservations();
  }

  getUserReservations() {
    this.userService.getUserReservations(this.currentPage + 1, +UserStorageService.getUserID()).subscribe(response => {
      console.log(response);
      this.reservations = response.reservations;
      this.total = response.totalReservations;
    })
  }

  pageIndexChange(event: PageEvent) {
    console.log(event)
    this.currentPage = event.pageIndex;
    this.getUserReservations();
  }

}
