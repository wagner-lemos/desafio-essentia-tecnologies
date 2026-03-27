import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-page',
  imports: [NgStyle],
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page {
  @Input() contentMaxWidth = '350px';
  @Input() contentMaxHeight = '410px';
  @Input() centered = true;
}
