import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoEmpresasComponent } from './acceso-empresas.component';

describe('AccesoEmpresasComponent', () => {
  let component: AccesoEmpresasComponent;
  let fixture: ComponentFixture<AccesoEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
