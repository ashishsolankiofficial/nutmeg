import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  error: string | undefined;
  submitted: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let val = this.loginForm.value
      this.authService.login(val.email, val.password).subscribe(
        (response) => {
          this.router.navigateByUrl('');
        },
        (error) => {
          this.error = error;
        }
      )
    }
  }

  get formControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

}
