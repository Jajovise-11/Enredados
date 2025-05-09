import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasBodaComponent } from './ideas-boda.component';

describe('IdeasBodaComponent', () => {
  let component: IdeasBodaComponent;
  let fixture: ComponentFixture<IdeasBodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasBodaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasBodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
