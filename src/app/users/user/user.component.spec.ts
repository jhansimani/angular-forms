import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceStub: Partial<UserService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let httpClientServiceSpy : jasmine.SpyObj<HttpClient>;
  userServiceStub = {};
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy },
        { provide: HttpClient, useSpy: httpSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpClientServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
