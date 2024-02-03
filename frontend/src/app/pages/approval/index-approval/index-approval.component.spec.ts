import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexApprovalComponent } from './index-approval.component';

describe('IndexApprovalComponent', () => {
  let component: IndexApprovalComponent;
  let fixture: ComponentFixture<IndexApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexApprovalComponent]
    });
    fixture = TestBed.createComponent(IndexApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
