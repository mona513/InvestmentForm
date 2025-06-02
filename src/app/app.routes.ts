import { Routes } from '@angular/router';
import { InvestmentFormComponent } from './investment-form/investment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'investments', pathMatch: 'full' },
  { path: 'investments', component: InvestmentFormComponent },
];
