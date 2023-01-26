import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacebetPageComponent } from './placebet-page.component';

describe('PlacebetPageComponent', () => {
  let component: PlacebetPageComponent;
  let fixture: ComponentFixture<PlacebetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacebetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacebetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
