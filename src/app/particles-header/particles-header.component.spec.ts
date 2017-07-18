import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticlesHeaderComponent } from './particles-header.component';

describe('ParticlesHeaderComponent', () => {
  let component: ParticlesHeaderComponent;
  let fixture: ComponentFixture<ParticlesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticlesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
