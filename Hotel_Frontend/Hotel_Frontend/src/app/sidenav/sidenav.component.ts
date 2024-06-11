import { Component } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  isUser: boolean = UserStorageService.getUser().role === 'user' ? true : false;
  isAdmin: boolean = UserStorageService.getUser().role === 'admin' ? true : false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isUser = UserStorageService.getUser().role === 'user' ? true : false;
        this.isAdmin = UserStorageService.getUser().role === 'admin' ? true : false;
      }
    })
  }
}
