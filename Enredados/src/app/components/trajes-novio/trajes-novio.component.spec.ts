import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajesNovioComponent } from './trajes-novio.component';

describe('TrajesNovioComponent', () => {
  let component: TrajesNovioComponent;
  let fixture: ComponentFixture<TrajesNovioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrajesNovioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrajesNovioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
