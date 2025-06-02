import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { AutoCurrencyDirective } from '../auto-currency.directive';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Investment, InvestmentService } from '../investment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReviewDialogComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    AutoCurrencyDirective,
    MatSelectModule,
  ],
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.scss',
})
export class InvestmentFormComponent implements OnInit {
  maxDate = new Date();
  assetTypes: string[] = [
    'Stocks',
    'Bonds',
    'Mutual Funds',
    'Real Estate',
    'Cryptocurrency',
  ];
  investmentForm = this.fb.group({
    assetType: ['', Validators.required],
    quantity: [null, [Validators.required, Validators.min(1)]],
    purchasePrice: [null, [Validators.required, Validators.min(0.01)]],
    purchaseDate: [
      null,
      [Validators.required, this.maxDateValidator.bind(this)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private investmentService: InvestmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('---ngonitiii---');

    this.investmentForm.reset();
  }
  maxDateValidator(control: AbstractControl) {
    const selectedDate = control.value;
    if (selectedDate && selectedDate > this.maxDate) {
      return { maxDate: true };
    }
    return null;
  }

  private getInvestmentFromForm(): Investment {
    const value = this.investmentForm.value;
    console.log(value);
    return {
      assetType: value.assetType ?? null,
      quantity: value.quantity ?? null,
      purchasePrice: value.purchasePrice ?? null,
      purchaseDate: value.purchaseDate ?? null,
    };
  }

  onSubmit() {
    if (this.investmentForm.valid) {
      const investment = this.getInvestmentFromForm();
      const dialogRef = this.dialog.open(ReviewDialogComponent, {
        width: '400px',
        data: this.investmentForm.value,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.investmentService.saveInvestment(investment);

          this.investmentForm.reset();
          this.investmentForm.markAsPristine();
          this.investmentForm.markAsUntouched();

          console.log(this.investmentForm.getRawValue());
          console.log(this.investmentForm.valid);
          console.log(this.investmentForm.errors);
          this.snackBar.open('Investment saved successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/investments']);
        }
      });
    }
  }
}
