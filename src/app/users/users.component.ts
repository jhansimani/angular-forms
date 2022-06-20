import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  users: User[] = [];
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = [...res];
    });
  }
  RouteToCreateUser() {
    this.router.navigate(['createNewUser'], {
      relativeTo: this.activatedRoute,
    });
  }
  editUser(user: User) {
    this.router.navigate(['edit-user', user.id], {
      relativeTo: this.activatedRoute,
    });
  }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);
    });
    this.users = this.users.filter((user) => user.id != id);
  }
  goTouser(id:any){
    this.router.navigate(['user',id ], {relativeTo:this.activatedRoute})
  }
}
