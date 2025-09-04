import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
@Directive({ selector: '[appLoading]', standalone: true })
export class LoadingDirective implements OnChanges {
  @Input('appLoading') loading = false;
  constructor(private el: ElementRef, private rd: Renderer2) {}
  ngOnChanges() {
    if (this.loading) { this.rd.setAttribute(this.el.nativeElement, 'disabled', 'true'); this.rd.addClass(this.el.nativeElement, 'disabled'); }
    else { this.rd.removeAttribute(this.el.nativeElement, 'disabled'); this.rd.removeClass(this.el.nativeElement, 'disabled'); }
  }
}