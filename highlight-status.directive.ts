import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {
  @Input('appHighlightStatus') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    // Reset all borders first
    this.renderer.removeStyle(this.el.nativeElement, 'border-left-color');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');

    let borderColor = '';
    let glowColor = '';

    switch (this.status.toLowerCase()) {
      case 'en attente':
        borderColor = 'rgba(148, 163, 184, 0.6)';  // slate
        glowColor   = 'rgba(148, 163, 184, 0.08)';
        break;
      case 'en cours':
        borderColor = 'rgba(250, 204, 21, 0.6)';   // yellow
        glowColor   = 'rgba(250, 204, 21, 0.08)';
        break;
      case 'terminé':
        borderColor = 'rgba(74, 222, 128, 0.6)';   // green
        glowColor   = 'rgba(74, 222, 128, 0.08)';
        break;
      case 'bloqué':
        borderColor = 'rgba(248, 113, 113, 0.6)';  // red
        glowColor   = 'rgba(248, 113, 113, 0.08)';
        break;
      default:
        borderColor = 'rgba(255, 255, 255, 0.1)';
        glowColor   = 'transparent';
    }

    this.renderer.setStyle(this.el.nativeElement, 'border-left', `3px solid ${borderColor}`);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', glowColor);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease');
  }
}
