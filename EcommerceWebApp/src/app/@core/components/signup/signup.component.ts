import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm() {
    this.signupForm = this.fb.group({
      firstname: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z -']+")],
      ],
      lastname: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z -']+")],
      ],
      username: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z -']+")],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if(this.signupForm.valid){
        this.auth.signupAuthentication(
          this.signupForm.value.email,
          this.signupForm.value.password
        );      
        this.auth.addData(this.signupForm.value)
    }
  }
  
}
