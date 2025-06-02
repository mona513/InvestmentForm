import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Investment {
  assetType: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}

const mockInvestments: Investment[] = [];

export const mockBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
 
  if (req.method === 'POST' && req.url.endsWith('/api/investments')) {
    const newInvestment: Investment = req.body;
    mockInvestments.push(newInvestment);
    console.log('Mock backend saved investment:', newInvestment);


    return of(new HttpResponse({ status: 201, body: newInvestment })).pipe(delay(500));
  }

  return next(req);
};
