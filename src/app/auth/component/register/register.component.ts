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

  hide: boolean = true;
  fireBaseErrorMessege: string = '';
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  getErrorMessage() {
    if (this.registerForm.hasError('required')) {
      return 'You must enter a value';
    }
    return
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ['', Validators.required]
    })
    console.log('initializeForm', this.registerForm.valid)
  }

  onSubmit() {
    console.log('Submit ', this.registerForm.value)
    this.store.dispatch(new RegisterAction(this.registerForm.value))

    this.authService.register(this.registerForm.value)
    .subscribe((currentUser: CurrentUserInterface) => console.log('****Current USer', currentUser))

    this.registerForm.reset()
  }

}

