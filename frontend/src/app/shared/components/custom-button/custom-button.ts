import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-custom-button',
  imports: [CommonModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomButton {
  @Input() color: 'primary' | 'danger' | 'secondary' | 'success' = 'primary';
  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  onClick(): void {
    if(!this.disabled) this.action.emit();
  }
}
