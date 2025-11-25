import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioDetalleComponent } from './servicio-detalle';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ServicioDetalleComponent', () => {
  let component: ServicioDetalleComponent;
  let fixture: ComponentFixture<ServicioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioDetalleComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
