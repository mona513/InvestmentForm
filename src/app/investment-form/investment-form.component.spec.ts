import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormComponent } from './investment-form.component';

describe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
