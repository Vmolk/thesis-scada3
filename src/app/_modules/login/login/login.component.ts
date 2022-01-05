import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from 'src/app/_service/admin/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;
  returnUrl: string;
  error: string;


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.createForm();
  }


  switchLang(lang: string) {
  }

    // form submit
  onSubmit(form:any) {
    if (this.loginForm.value.username !== 'admin' && this.loginForm.value.password !== 'admin') {
      if (this.loginForm.invalid) {
        return;
      }
    }
    //this.spinner.show();
    const user = {
      username: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password
    };
    this.authenticationService.login(user).subscribe(
      data => {
        if (data) {
          this.router.navigate([this.returnUrl]);
          this.spinner.hide();
        }
      },
      err => {
        this.error = `message.${err.error.errorKey}`;
        this.spinner.hide();
      }
    );
  }

    // Initial Form with validations
    createForm() {
      this.loginForm = this.formBuilder.group({
        username: new FormControl('', [
          Validators.required,
        ]
        ),
        password: new FormControl('', [
          Validators.required,
        ]),
      });
    }

}
