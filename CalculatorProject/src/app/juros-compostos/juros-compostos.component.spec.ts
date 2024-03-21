import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurosCompostosComponent } from './juros-compostos.component';

describe('JurosCompostosComponent', () => {
  let component: JurosCompostosComponent;
  let fixture: ComponentFixture<JurosCompostosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JurosCompostosComponent]
    });
    fixture = TestBed.createComponent(JurosCompostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
