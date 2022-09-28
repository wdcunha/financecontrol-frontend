import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  loginForm!: FormGroup;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    })
  }

  requiredError(field: string) {
    return this.loginForm.get(field)?.hasError('required');
  }

  onSubmit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }}
