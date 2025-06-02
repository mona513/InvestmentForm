import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Investment {
  assetType: string | null;
  quantity: number | null;
  purchasePrice: number | null;
  purchaseDate: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private apiUrl = '/api/investments';

  constructor(private http: HttpClient) {}

  saveInvestment(investment: Investment): Observable<Investment> {
    return this.http.post<Investment>(this.apiUrl, investment);
  }
}
