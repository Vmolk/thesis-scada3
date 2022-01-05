import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { interval, range } from 'rxjs';
import { SignalrService } from 'src/app/_service/signal/signalr.service';

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.scss']
})
export class FlowChartComponent implements OnInit {
  subscription: any;

  constructor(
    private signalrService:SignalrService
  ) { }

  ngOnInit(): void {
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.updateDatabase());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateDatabase(){

    this.lineChartData[0].data?.push(this.signalrService.FlowMeter);
    var myDate = new Date() ;
    var date = myDate.getFullYear()+"-"+ Number(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    this.lineChartLabels.push(String(date))
    if(this.lineChartData[0].data?.length === 1000){
      this.lineChartData[0].data?.splice(0,1);
      this.lineChartLabels.splice(0,1);
    }
  }


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Level Meter',pointRadius:0},
  ];

  lineChartLabels: Label[] = [];

  myList:Label[]=[];




  lineChartOptions:ChartOptions = {
    responsive: true,
    animation: {
      duration: 0
    }
  };

  countEventsOptions: ChartOptions = {

    maintainAspectRatio: false,
    elements: {
    line: {
          tension: 0.5 //Smoothening (Curved) of data lines
      }
    },
    tooltips: {
    mode: 'index',
    intersect: false,
    },
    hover: {
    mode: 'nearest',
    intersect: true
    },
    scales: {
    xAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Time',
      },
        gridLines: { display: true },
        ticks: {
            beginAtZero: true,
        },
    }],
    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Value'
      },
        ticks: {
            beginAtZero:true
        }
    }]
    }
 };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType:ChartType = 'line';

}
