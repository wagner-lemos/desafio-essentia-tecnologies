import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { ShareModules } from '../../../../shared/shared.module';
import { InputTodo } from "../todo-input/todo-input";
import { TodoList } from "../todo-list/todo-list";
import { TodoService } from '../../services/todo.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-component.html',
  styleUrls: ['./todo-component.scss'],
  imports: [ShareModules, InputTodo, TodoList, CustomButton]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error = "";

  constructor(
    private todoService: TodoService, 
    private toast: ToastService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.loading = true;
    this.todoService.getAll().subscribe({
      next: (tasks) => {
        this.todos = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        this.toast.showError('Erro ao carregar tarefas.')
      }
    });
  }

  addTodo(text: string) {
    if (!text.trim()) return;
    
    const newTodo: Partial<Todo> = {
      title: text,
      status: false
    };

    this.todoService.create(newTodo).subscribe({
      next: (created) => {
        this.todos.push(created);
        this.loadTodos();
      },
      error: (err) => {
        this.error = err.message;
        this.toast.showError('Erro ao criar tarefa.')
      }
    });
  }

  toggleComplete(todo: Todo, status: boolean) {
    this.todoService.update(todo.id!, { status }).subscribe({
      next: () => todo.status = status,
      error: err => console.error(err)
    });
  }

  editTodo(todo: Todo, newTitle: string) {
    if (!newTitle.trim()) return;
    this.todoService.update(todo.id!, { title: newTitle }).subscribe({
      next: () => {
        todo.title = newTitle
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
          this.toast.showError('Erro ao editar tarefa.')
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.delete(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
        this.toast.showError('Erro ao deletar tarefa.')
    }
    });
  }

  logout() {
    this.auth.logout();
  }
}