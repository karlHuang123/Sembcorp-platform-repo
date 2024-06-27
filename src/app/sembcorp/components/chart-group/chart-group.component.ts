import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { DataService } from '../../service/service';

import * as moment from 'moment';

@Component({
  selector: 'app-chart-group',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './chart-group.component.html',
  styleUrl: './chart-group.component.scss'
})
export class ChartGroupComponent {

  public chartOptions: AgChartOptions;
  public lineOptions: AgChartOptions;
  data: any[] = []
  constructor(private dataService: DataService) {
    this.chartOptions = {
      title: {
        text: "Today's Generation",
        color: 'white',
      },
      data: [
        { asset: "generated", amount: 75000 },
        { asset: "ungenerated", amount: 25000 },
      ],
      background: {
        fill: "rgba(0, 0, 0, 0)",
      },
      // Series: Defines which chart type and data to use
      series: [{ 
        type: 'donut',           
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.9,
        innerLabels: [
          {
            text: "477.5 MWp",
            margin: 4,
            fontSize: 10,
            color: "white",
          },
        ],}],
        legend: {
          enabled: false
        }
    };
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
        this.lineOptions = {
          title: {
            text: "Irradiation Timeline",
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

}
