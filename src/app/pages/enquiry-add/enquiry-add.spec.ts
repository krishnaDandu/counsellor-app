import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryAdd } from './enquiry-add';

describe('EnquiryAdd', () => {
  let component: EnquiryAdd;
  let fixture: ComponentFixture<EnquiryAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
