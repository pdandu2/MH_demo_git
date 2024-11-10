import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with showLoginForm as false', () => {
    expect(component.showLoginForm).toBeFalse();
  });

  it('should set provider credentials when selecting provider role', () => {
    component.selectRole('provider');
    expect(component.email).toBe('provider@demo.com');
    expect(component.password).toBe('demo');
    expect(component.showLoginForm).toBeTrue();
  });

  it('should set patient credentials when selecting patient role', () => {
    component.selectRole('patient');
    expect(component.email).toBe('patient@demo.com');
    expect(component.password).toBe('demo');
    expect(component.showLoginForm).toBeTrue();
  });

  it('should reset form when clicking back', () => {
    component.selectRole('provider');
    component.back();
    expect(component.showLoginForm).toBeFalse();
    expect(component.selectedRole).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.error).toBe('');
  });

  it('should navigate to dashboard with valid provider credentials', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.selectRole('provider');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to patient-dashboard with valid patient credentials', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.selectRole('patient');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['/patient-dashboard']);
  });

  it('should show error message with invalid credentials', () => {
    component.selectRole('provider');
    component.email = 'wrong@email.com';
    component.login();
    expect(component.error).toBe('Invalid credentials. Use provider@demo.com / demo');
  });
});