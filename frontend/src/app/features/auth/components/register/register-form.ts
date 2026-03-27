import { Component, OnInit } from '@angular/core';
import { FormInput } from '../../../../shared/components/input/form-input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareModules } from '../../../../shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [FormInput, ReactiveFormsModule, ShareModules],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return this.form.markAllAsTouched();
    }

    const { name, email, password } = this.form.value;

    this.auth.register(name, email, password).subscribe({
      next: () => {
        
        this.toast.showSuccess('Conta cadastrada com sucesso!')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error(err);
        this.toast.showError('Erro ao cadastrar conta.')
    }
    })
  }
}
