import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiBodaComponent } from './mi-boda.component';

describe('MiBodaComponent', () => {
  let component: MiBodaComponent;
  let fixture: ComponentFixture<MiBodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiBodaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiBodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
