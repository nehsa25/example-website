import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'super-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('super-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Dr. Harding is available on the following days for annual physicals.');
  });

  it('should create timeItems array from dates', () => {
    expect(component.timeItems.length).toBe(component.dates.length);

    // Test individual timeItem properties
    expect(component.timeItems[0].full).toBe(component.dates[0]);
    expect(component.timeItems[0].year).toBe(2024);
    // ... Add similar checks for other properties
  });

  it('should return the correct month abbreviation', () => {
    expect(component.getMonthAbbreviation(1)).toBe('Jan');
    expect(component.getMonthAbbreviation(2)).toBe('Feb');
    expect(component.getMonthAbbreviation(3)).toBe('Mar');
    expect(component.getMonthAbbreviation(4)).toBe('Apr');
    expect(component.getMonthAbbreviation(5)).toBe('May');
    expect(component.getMonthAbbreviation(6)).toBe('Jun');
    expect(component.getMonthAbbreviation(7)).toBe('Jul');
    expect(component.getMonthAbbreviation(8)).toBe('Aug');
    expect(component.getMonthAbbreviation(9)).toBe('Sep');
    expect(component.getMonthAbbreviation(10)).toBe('Oct');
    expect(component.getMonthAbbreviation(11)).toBe('Nov');
    expect(component.getMonthAbbreviation(12)).toBe('Dec');  
  });

  it('should update selectedMonth when selectMonth is called', () => {
    expect(component.selectedMonth).toBe(component.current_month);
    component.selectMonth(5); // Select June (index 5)
    expect(component.selectedMonth).toBe(6);
  });

  it('should update enabled months in ngOnInit', () => {
    expect(component.months_enabled.length).toBeGreaterThan(0);
    //  Check if all unique months from dates are present in months_enabled
    const uniqueMonths = new Set(component.dates.map(date => component.getMonth(date)));
    expect(component.months_enabled.length).toBe(uniqueMonths.size);
  });
});
