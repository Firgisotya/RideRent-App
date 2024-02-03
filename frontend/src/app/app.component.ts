import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { StorageService } from './service/auth/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private router: Router,
    public auth: AuthService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    this.isAuthRoute()
  }

  isAuthRoute(){
    return (this.storage.isLogged() == false) ? this.router.url === '/' : this.router.url === '/dashboard'
  }
}
