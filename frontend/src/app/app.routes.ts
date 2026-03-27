import { Routes } from '@angular/router';
import { RegisterForm } from './features/auth/components/register/register-form';
import { TodoComponent } from './features/todo/components/todo-component/todo-component';
import { LoginForm } from './features/auth/components/login/login-form';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginForm },
  { path: 'registrar', component: RegisterForm },
  { path: 'lista-de-tarefas', component: TodoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
