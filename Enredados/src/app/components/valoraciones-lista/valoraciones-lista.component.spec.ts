import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionesListaComponent } from './valoraciones-lista.component';

describe('ValoracionesListaComponent', () => {
  let component: ValoracionesListaComponent;
  let fixture: ComponentFixture<ValoracionesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValoracionesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoracionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
