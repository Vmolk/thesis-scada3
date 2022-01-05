import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { interval, range } from 'rxjs';

import {SignalrService} from 'src/app/_service/signal/signalr.service'

@Component({
  selector: 'app-level-chart',
  templateUrl: './level-chart.component.html',
  styleUrls: ['./level-chart.component.scss']
})
export class LevelChartComponent implements OnInit {
  @Input() data:any;
  @Input() Setpoint:any
  subscription: any;
  constructor(
    private signalrService:SignalrService
  ) { }

  ngOnInit(): void {
    this.getStarted()
  }

  getStarted(){
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.updateDatabase());
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateDatabase(){

    this.lineChartData[0].data?.push(this.data);
    var myDate = new Date() ;
    var date = myDate.getFullYear()+"-"+ Number(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    this.lineChartLabels.push(String(date))
    if(this.lineChartData[0].data?.length === 1000){
      this.lineChartData[0].data?.splice(0,1);
      this.lineChartLabels.splice(0,1);
    }
  }

  lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Level Meter',pointRadius:0},
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

    responsive: true,
    legend: {
        position: 'bottom',
    },
    hover: {
        mode: 'label'
    },
    scales: {
        xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    //steps: 10,
                    //stepValue: 5,
                    max: 100
                }
            }]
    },
    title: {
        display: true,
        text: 'Chart.js Line Chart - Legend'
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
