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

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  loginUser() {
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


  ngOnInit(): void {
  }

}
