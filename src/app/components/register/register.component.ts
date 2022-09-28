import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  errorMessage = '';
  fieldRequired: string = "Campo de preenchimento obrigatório";
  isSuccessful = false;
  isSignUpFailed = false;
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      role: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      password: new FormControl(null, [Validators.required, this.checkPassword]),
    })
  }

  emailErrors() {
    const notValidEmail: string = 'Not a valid email address';

    return this.registerForm.get('email')?.hasError('required') ? this.fieldRequired :
      this.registerForm.get('email')?.hasError('pattern') ? notValidEmail : '';
  }

  checkPassword(control: { value: any; }) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    const passLengthError = 'The password must be at least six characters, one uppercase letter and one number';

    return this.registerForm.get('password')?.hasError('required') ? `${this.fieldRequired} ${passLengthError}` :
      this.registerForm.get('password')?.hasError('requirements') ? passLengthError : '';
  }

  checkValidation(input: string) {
    const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched);

    return validation;
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const username = this.registerForm.value.username;
    // TODO: add multi-select for more than one role
    const role: string[] = [this.registerForm.value.role];
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.authService.register(username, role, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.snackBar.open(`Dados do usuário ${data.username} criados com sucesso!`, 'Sucesso', { duration: 10000 })
        formDirective.resetForm();
        this.registerForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
