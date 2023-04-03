import { Component, OnInit } from '@angular/core';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  MS_PER_DAY = 1000 * 60 * 60 * 24;

  data = [
    { task: 'Task 1', startDate: '2018-04-08 00:00:00.000', endDate: '2018-06-08 00:00:00.000' },
    { task: 'Task 2', startDate: '2018-05-08 00:00:00.000', endDate: '2018-07-19 00:00:00.000' },
    { task: 'Task 3', startDate: '2018-07-08 00:00:00.000', endDate: '2018-09-08 00:00:00.000' },
    { task: 'Growth Stages' },
  ];

  data1 = [
    {},
    {},
    {},
    { task: 'VP', startDate: '2018-04-21 00:00:00.000', endDate: '2018-05-08 00:00:00.000' },
  ];

  data2 = [
    {},
    {},
    {},
    { task: 'VE', startDate: '2018-05-09 00:00:00.000', endDate: '2018-06-08 00:00:00.000' },
  ];

  chartData;
  options;
  plantingDays = '2018-04-01 00:00:00.000';

  constructor() {
  }

  lables = ['Task 1', 'Task 2', 'Task 3', 'Growth Stages'];
  stages = ['VP', 'VE', 'V6', 'VTR1'];

  createChart() {
    const that = this;
    this.chartData = {
      // labels: this.data.map(t => t.task),
      labels: this.lables,
      datasets: [
        {
          data: this.data.map(t => {
            return this.dateDiffInDays(new Date(this.plantingDays), new Date(t.startDate));
          }),
          datalabels: {
            color: '#025ced',
            formatter: function (value, context) {
              return '';
            }
          },
          backgroundColor: 'rgba(63,103,126,0)',
          hoverBackgroundColor: 'rgba(50,90,100,0)',
        },
        {
          data: this.data.map(t => {
            return this.dateDiffInDays(new Date(t.startDate), new Date(t.endDate));
          }),
          datalabels: {
            color: '#025ced',
            formatter: function (value, context) {
              return '';
            }
          },
        },
        {
          data: this.data1.map(t => {
            return this.dateDiffInDays(new Date(t.startDate), new Date(t.endDate));
          }),
          datalabels: {
            color: '#025ced',
            formatter: function (value, context) {
              return that.stages[0];
            }
          },
        },
        {
          data: this.data2.map(t => {
            return this.dateDiffInDays(new Date(t.startDate), new Date(t.endDate));
          }),
          datalabels: {
            color: '#025ced',
            formatter: function (value, context) {
              return that.stages[1];
            }
          },
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Title of Chart',
      },
      legend: { display: false },
      tooltips: {
        mode: 'index',
        callbacks: {
          label: function (tooltipItem, d) {
            let label = d.datasets[tooltipItem.datasetIndex].label || '';
            const date = new Date(that.plantingDays);
            if (tooltipItem.datasetIndex === 0) {
              const diff = that.dateDiffInDays(date, new Date(that.data[tooltipItem.index].startDate));
              date.setDate(diff + 1);
              label += 'Start Date: ' + that.getDate(date);
            } else if (tooltipItem.datasetIndex === 1) {
              const diff = that.dateDiffInDays(date, new Date(that.data[tooltipItem.index].endDate));
              date.setDate(diff + 1);
              label += 'End Date: ' + that.getDate(date);
            }
            return label;
          },
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            callback: function (value, index, values) {
              const date = new Date(that.plantingDays);
              date.setDate(value);
              return that.getDate(date);
            },
          },
        }],
        yAxes: [{
          stacked: true,
        }],
      },
    };
  }

  getDate(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).substr(-2)
      + '-' + ('0' + (date.getDate())).substr(-2);
  }

  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
  }

  ngOnInit() {
    this.createChart();
  }

}

