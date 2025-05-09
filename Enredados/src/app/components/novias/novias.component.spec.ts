import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviasComponent } from './novias.component';

describe('NoviasComponent', () => {
  let component: NoviasComponent;
  let fixture: ComponentFixture<NoviasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoviasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
