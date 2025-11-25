import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementosNoviaComponent } from './complementos-novia.component';

describe('ComplementosNoviaComponent', () => {
  let component: ComplementosNoviaComponent;
  let fixture: ComponentFixture<ComplementosNoviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementosNoviaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementosNoviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
