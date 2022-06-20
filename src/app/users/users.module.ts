import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NoopInterceptor } from './interceptors/noop.interceptor';
import { UserComponent } from './user/user.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, EditUserComponent, UserComponent, ModalComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
  ],
})
export class UsersModule {}
