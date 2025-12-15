import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-mermaid-diagram',
  standalone: true,
  template: `
    <div class="mermaid-container" style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;">
      <div #mermaidDiv></div>
    </div>
  `
})
export class MermaidDiagramComponent implements OnInit, AfterViewInit {
  @Input() diagram: string = '';
  @Input() title?: string;
  @ViewChild('mermaidDiv', { static: false }) mermaidDiv!: ElementRef;

  ngOnInit(): void {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
      fontSize: 14
    });
  }

  ngAfterViewInit(): void {
    if (this.diagram && this.mermaidDiv) {
      this.renderDiagram();
    }
  }

  private async renderDiagram(): Promise<void> {
    try {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      const { svg } = await mermaid.render(id, this.diagram);
      this.mermaidDiv.nativeElement.innerHTML = svg;
    } catch (error) {
      console.error('Error rendering Mermaid diagram:', error);
      this.mermaidDiv.nativeElement.innerHTML = '<p style="color: red;">Erro ao renderizar diagrama</p>';
    }
  }
}
