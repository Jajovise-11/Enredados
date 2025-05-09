import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviosComponent } from './novios.component';

describe('NoviosComponent', () => {
  let component: NoviosComponent;
  let fixture: ComponentFixture<NoviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoviosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
