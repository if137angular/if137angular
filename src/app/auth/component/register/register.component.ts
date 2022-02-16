import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CurrentUserInterface } from '../../models/currentUser.interface';
import { AuthService } from '../../service/auth.service';
import { RegisterAction } from '../../store/register.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ['', Validators.required]
    })
    console.log('initializeForm', this.form.valid)
  }

  onSubmit() {
    console.log('Submit ', this.form.value)
    this.store.dispatch(new RegisterAction(this.form.value))

    this.authService.register(this.form.value)
    .subscribe((currentUser: CurrentUserInterface) => console.log('****Current USer', currentUser))

    this.form.reset()
  }

}

