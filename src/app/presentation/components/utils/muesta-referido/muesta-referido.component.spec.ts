import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestaReferidoComponent } from './muesta-referido.component';

describe('MuestaReferidoComponent', () => {
  let component: MuestaReferidoComponent;
  let fixture: ComponentFixture<MuestaReferidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuestaReferidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuestaReferidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
