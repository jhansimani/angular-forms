import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  submitted = false;
  user!: User;
  id!: number;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res;
      console.log(res);
      let { id, ...updatedUser } = this.user;
      this.userForm.setValue(updatedUser);
    });
    console.log(this.user);
  }
  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    // password: new FormControl('', [Validators.required]),
    // confirmPassword: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', Validators.required),
    DOB: new FormControl('', Validators.required),
  });
  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    console.log(this.userForm.value);
    this.submitted = true;
    let user: User = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      mobileNumber: this.userForm.value.mobileNumber,
      profileImage: this.userForm.value.profileImage,
      DOB: this.userForm.value.DOB,
      id: this.id,
    };
    this.userService.updateUser(user).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['users']);
  }
  cancel() {
    this.router.navigate(['users']);
  }
}
