import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  id: any;
  user: any;
  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
    });
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res;
    });
    console.log(this.id,this.user);
  }
}
