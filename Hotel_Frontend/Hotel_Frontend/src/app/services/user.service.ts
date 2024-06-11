import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  signUp(data: any) {
    return this.httpClient.post(this.url + '/user/signup/', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/user/login/', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + '/user/checkToken/');
  }

  addNewRoom(data: any) {
    return this.httpClient.post(this.url + '/rooms/addNewRoom/', data, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader() {
    let authheaders: HttpHeaders = new HttpHeaders();
    return authheaders.set(
      'Authorization','Bearer ' + UserStorageService.getToken()
    )
  }
}
