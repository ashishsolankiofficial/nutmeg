import { HttpErrorResponse } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  userProfile: any;
  error: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(resp => this.userProfile = resp)
  }

  submit(data: any) {
    this.userService.saveUserProfile(data).subscribe(resp => {
      this.router.navigate([`/profile/${this.userProfile.ext_id}`])
    }, (error: HttpErrorResponse) => {
      this.error = error
    })
  }
}
