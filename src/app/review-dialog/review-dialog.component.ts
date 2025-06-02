import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { CommonModule, CurrencyPipe, DecimalPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { InvestmentValuePipe } from "../investment-value.pipe";

@Component({
  selector: "app-review-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    InvestmentValuePipe,
  ],
  templateUrl: "./review-dialog.component.html",
  styleUrl: "./review-dialog.component.scss",
  providers: [CurrencyPipe, DecimalPipe],
})
export class ReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(): void {
    this.dialogRef.close("confirm");
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
