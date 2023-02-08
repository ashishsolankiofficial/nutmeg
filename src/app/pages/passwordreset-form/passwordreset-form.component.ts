import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-passwordreset-form',
  templateUrl: './passwordreset-form.component.html',
  styleUrls: ['./passwordreset-form.component.scss']
})
export class PasswordresetFormComponent implements OnInit {

  resetForm = new FormGroup({
    old_password: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  });

  submitted: Boolean = false
  error: any;
  userId: any;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.userService.getUser()
  }

  passwordReset() {
    this.submitted = true
    if (this.resetForm.valid) {
      let val = this.resetForm.value
      this.authService.resetPassword(val.old_password, val.password, val.password2).subscribe(
        (response) => {
          this.router.navigate([`/profile/${this.userId}`]);
        },
        (error) => {
          this.error = error;
        }
      )
    }
  }

  get formControl() {
    return this.resetForm.controls;
  }
}
