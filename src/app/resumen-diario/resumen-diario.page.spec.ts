import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenDiarioPage } from './resumen-diario.page';

describe('ResumenDiarioPage', () => {
  let component: ResumenDiarioPage;
  let fixture: ComponentFixture<ResumenDiarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
