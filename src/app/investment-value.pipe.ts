import { Pipe, PipeTransform } from '@angular/core';
import { formatDate, CurrencyPipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'investmentValue',
  standalone: true, 
 
})
export class InvestmentValuePipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe
  ) {}

  transform(value: any, type: 'currency' | 'date' | 'quantity'): string {
    if (value == null || value === '') return '-';

    switch (type) {
      case 'currency':
        return this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2', 'en-US') ?? '';
      case 'date':
        return formatDate(value, 'dd/MM/yyyy', 'en-GB');
      case 'quantity':
        return this.decimalPipe.transform(value, '1.0-0') ?? '';
      default:
        return value;
    }
  }
}
