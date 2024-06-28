import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { DataService } from '../../service/service';

import * as moment from 'moment';

@Component({
  selector: 'app-daily-section',
  templateUrl: './daily-section.component.html',
  styleUrl: './daily-section.component.scss',
  standalone: true,
  imports: [AgChartsAngular],
})
export class DailySectionComponent {
  @Input() isMobile: boolean;
  @Output() closed = new EventEmitter<any>();

  public chartOptions: AgChartOptions;
  data: any[]
  constructor(private dataService: DataService) {
    const today = moment().format('YYYY-MM-DD')
    let data = []
    this.dataService.getEnergyData({startDate: today, endDate: today}).subscribe(
      (response: any) => {
        response.hourly.direct_radiation.forEach((item: string, index: number) => {
          const ele = {
            hour: moment(response.hourly.time[index]).format('HH:mm'),
            direct_radiation: item
          }
          data.push(ele)
        })
        this.data = data
        this.chartOptions = {
          title: {
            text: "Daily(Today) Energy Generator",
            color: 'white',
          },
          data: this.data,
          background: {
            fill: "rgba(0, 0, 0, 0)",
          },
          // Series: Defines which chart type and data to use
          series: [{ type: 'area', xKey: 'hour', yKey: 'direct_radiation'}],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              label: {
                color: 'white',
                rotation: 60
              }
            },
            {
              type: "number",
              position: "left",
              label: {
                color: 'white',
              },
            },
          ]
        };
      }
    )
  }
  onClose() {
      this.closed.emit({msg: 'close'})
    }
}
