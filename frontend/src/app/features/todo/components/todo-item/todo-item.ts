import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { CustomButton } from "../../../../shared/components/custom-button/custom-button";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInput } from "../../../../shared/components/input/form-input";
import { CustomCheckbox } from "../../../../shared/components/custom-checkbox/custom-checkbox";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CustomButton, FormsModule, CommonModule, FormInput, CustomCheckbox],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss'],
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<{ status: boolean }>();
  @Output() saveEdit = new EventEmitter<string>();

  editing = false;
  editTitle = '';

  onDelete() {
    this.delete.emit(this.todo.id);
  }

  startEdit() {
    this.editing = true;
    this.editTitle = this.todo.title;
  }

  save() {
    this.saveEdit.emit(this.editTitle)
    this.editing = false;
  }
}
