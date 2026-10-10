import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  imports: [],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePicker {
  selected = input<string | undefined>();
  available = input<string[] | null>(null);
  dateChange = output<string>();

  days = this.buildDays();

  private buildDays() {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      result.push({
        value: this.toIsoDate(d),
        dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
        num: String(d.getDate()).padStart(2, '0'),
      });
    }
    return result;
  }
  private toIsoDate(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
