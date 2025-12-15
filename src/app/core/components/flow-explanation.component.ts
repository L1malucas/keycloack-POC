import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flow-explanation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <details [open]="defaultOpen" style="margin: 20px 0; border: 1px solid #dee2e6; border-radius: 4px; padding: 10px; background-color: #fff;">
      <summary style="cursor: pointer; font-weight: bold; padding: 5px; user-select: none;">
        {{ title }}
      </summary>
      <div style="margin-top: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
        <ng-content></ng-content>
      </div>
    </details>
  `
})
export class FlowExplanationComponent {
  @Input() title: string = 'Como funciona';
  @Input() defaultOpen: boolean = false;
}
