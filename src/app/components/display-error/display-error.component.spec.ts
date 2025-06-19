import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorComponent } from './display-error.component';

fdescribe('DisplayErrorComponent', () => {
  let component: DisplayErrorComponent;
  let fixture: ComponentFixture<DisplayErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    component.error = 'Test error message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test error message');
  });

  it('should not display anything if error is empty', () => {
    component.error = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('');
  });
});
