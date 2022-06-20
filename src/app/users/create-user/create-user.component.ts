import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  submitted = false;
  ngOnInit(): void {}
  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    // password: new FormControl('', [Validators.required]),
    // confirmPassword: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', Validators.required),
    // DOB: new FormControl('', Validators.required),
  });
  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return;
    }
    console.log(this.userForm.value);

    let createdAt = new Date();
    let user: User = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      mobileNumber: this.userForm.value.mobileNumber,
      profileImage: this.userForm.value.profileImage,
      DOB: createdAt
    };
    this.userService.postuser(user).subscribe((res) => {
      console.log(res);
    });
    this.userForm.reset();
    this.submitted = false;
    this.router.navigate(['users']);
  }
  cancel() {
    this.router.navigate(['users']);
  }
}
