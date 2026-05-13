import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../../../shared/components/input/form-input';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-todo',
  standalone: true,
  imports: [CommonModule, FormInput, CustomButton, ReactiveFormsModule],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.scss',
})
export class InputTodo {
  @Output() add = new EventEmitter<string>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['']
    });
  }

  onSubmit() {
    const text = this.form.value.text?.trim();
    if (!text) return;
    this.add.emit(text);
    this.form.reset();
  }
}
