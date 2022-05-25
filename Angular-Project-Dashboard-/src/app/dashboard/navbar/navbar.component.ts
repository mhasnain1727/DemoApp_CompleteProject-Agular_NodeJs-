import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('dash_key');
    this.router.navigateByUrl('/login');
    localStorage.removeItem('indexVal');
  }

  onProfile(){
    this.router.navigateByUrl('dashboard/profile');
  }

  onQuiz(){
    this.router.navigateByUrl('dashboard/quiz');
  }
}
