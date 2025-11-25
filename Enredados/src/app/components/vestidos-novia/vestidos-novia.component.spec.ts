import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosNoviaComponent } from './vestidos-novia.component';

describe('VestidosNoviaComponent', () => {
  let component: VestidosNoviaComponent;
  let fixture: ComponentFixture<VestidosNoviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestidosNoviaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VestidosNoviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
