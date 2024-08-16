import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface timeItem {
  full: string;
  year: number;
  month: number;
  day: number;
  hour: string;
  minute: string;  
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, MatStepperModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dates = ["2024-08-20 1:00 PM", "2024-08-21 10:00 AM", "2024-09-03 11:00 AM", "2024-09-04 3:00 PM", "2024-09-10 10:00 AM", "2024-09-11 9:00 AM", "2024-09-17 5:00 PM", "2024-09-24 5:00 PM", "2024-09-25 3:30 PM"]
  title = 'super-app';
  formGroup1 = this._formBuilder.group({
    name: new FormControl(),
  });
  formGroup2 = this._formBuilder.group({
    name: new FormControl(),
  });
  months_enabled: number[] = [];
  current_month: number = new Date().getMonth() + 1;
  selectedMonth = this.current_month;
  selectedTime: timeItem | null = null;  
  timeItems: timeItem[] = [];
  constructor(private _formBuilder: FormBuilder) {
    console.log('current_month: ' + this.current_month);
    console.log('wanted_month: ' + this.selectedMonth);
    this.timeItems = this.dates.map(dateString => {
      const full = dateString;
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hourString, minuteString] = timePart.split(':');
      const hour = hourString;
      let minute = minuteString === "0" ? "00" : minuteString;
      return {
        full,
        year,
        month,
        day,
        hour,
        minute
      };
    });
  }

  getMonthAbbreviation(month: number) {
    return this.getMonthByMonthIndex(month).substring(0, 3);
  }

  getMonth(date: string) {
    console.log('getMonth: ' + date + ', ' + new Date(date.split(" ")[0]).getMonth());
    return this.months[new Date(date.split(" ")[0]).getMonth()];
  }

  getMonthByMonthIndex(month: number) {
    return this.months[month-1];
  }

  getDayByDayIndex(day: number) {
    return new Date(2024, 0, day).toLocaleString('en-us', {weekday: 'long'});
  }

  getDayAbbreivation(day: number) {
    return this.getDayByDayIndex(day).substring(0, 3);
  }

  ngOnInit() {
    console.log('ngOnInit');
    for (let date of this.dates) {
      const curMonth = this.getMonth(date);
      if (this.months_enabled.indexOf(this.months.indexOf(curMonth)) === -1) {
        this.months_enabled.push(this.months.indexOf(curMonth));
      }
    }
  }

  selectMonth(i: number) {
    this.selectedMonth = i;
  }

  setTime(time: timeItem) {
    this.selectedTime = time;
  }
}
