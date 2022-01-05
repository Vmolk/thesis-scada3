import { Component, OnInit } from '@angular/core';
import {DashboardService} from 'src/app/_service/dashboard/dashboard.service';
import {Router} from '@angular/router';
import { interval, Subscription } from 'rxjs';
import {DataVisualService} from 'src/app/_service/data-visual/data-visual.service'
import { SignalrService} from 'src/app/_service/signal/signalr.service'
@Component({
  selector: 'app-storage',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
    private dashboardService : DashboardService,
    private route: Router,
    private dataVisualService:DataVisualService,
    public signalrService :SignalrService
  ) { }

  FillValveValue:any ;
  DischargeValveValue:any;
  LevelMeter:any ;
  FlowMeter:any ;
  Setpoint:any
  subscription:Subscription


  ngOnInit(): void {
    this.unSubcribeChartData();
    this.getStarted();

  }
  ngOnDestroy() {

    this.unSubcribeChartData();
    this.signalrService.hubConnection.off("askServerResponse");
  }
  getStarted(){
    this.updateTank()
    this.subcribeChartData();

    this.signalrService.startConnection();


    setTimeout(() => {
      this.signalrService.askServerListener();
    }, 2000);
  }

  subcribeChartData(){
    this.dataVisualService.getSubcribeAllNode()
    .subscribe((data:any)=>{
    })
  }

  unSubcribeChartData(){
    this.dataVisualService.unSubcribeAllNode()
    .subscribe((data:any)=>{

    })
  }

  updateTank(){
    this.dashboardService.getAllModelData()
    .subscribe(
      (data: any) => {
        this.signalrService.FlowMeter = Math.round(data.FlowMeter.Output);
        this.signalrService.LevelMeter =Math.round(data.LevelMeter.Output);
        this.signalrService.FillValve =Math.round(data.Valve.FillValve);
        this.signalrService.DischargeValve =Math.round(data.Valve.DischargeValve);
        this.Setpoint = data.Setpoint;
    });
  }
}
