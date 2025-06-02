import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAutoCurrency]',
  standalone: true,
})
export class AutoCurrencyDirective {
  @Input() currencySymbol = '$';

  private lastValue: string | null = null;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('focus')
  onFocus() {
    const value = this.el.nativeElement.value.replace(/[^0-9.]/g, '');
    this.el.nativeElement.value = value;
  }

  @HostListener('blur')
  onBlur() {
    const value = parseFloat(this.el.nativeElement.value);
    if (!isNaN(value)) {
      this.lastValue = value.toFixed(2);
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
      this.el.nativeElement.value = formatted;
    }
  }
   @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'Home', 'End',
      '.', // decimal point
    ];

    // Allow Ctrl/Command + A,C,V,X
    if ((event.ctrlKey || event.metaKey) && ['a','c','v','x'].includes(event.key.toLowerCase())) {
      return;
    }

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Only digits 0-9 allowed
    if (event.key >= '0' && event.key <= '9') {
      // Also enforce max two decimals after '.'
      const current: string = this.el.nativeElement.value;
      const selectionStart = this.el.nativeElement.selectionStart || 0;
      const selectionEnd = this.el.nativeElement.selectionEnd || 0;
      const next = current.substring(0, selectionStart) + event.key + current.substring(selectionEnd);

      if (next.indexOf('.') >= 0) {
        const decimalPart = next.split('.')[1];
        if (decimalPart.length > 2) {
          event.preventDefault();
        }
      }

      return;
    }

    // Block everything else
    event.preventDefault();
  }
}
