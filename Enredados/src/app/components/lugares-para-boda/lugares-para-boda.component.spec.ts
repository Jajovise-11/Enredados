import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresParaBodaComponent } from './lugares-para-boda.component';

describe('LugaresParaBodaComponent', () => {
  let component: LugaresParaBodaComponent;
  let fixture: ComponentFixture<LugaresParaBodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LugaresParaBodaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LugaresParaBodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
