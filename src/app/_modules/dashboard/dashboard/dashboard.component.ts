import { Component, OnInit } from '@angular/core';
import {DashboardService} from 'src/app/_service/dashboard/dashboard.service';
import { interval, Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { SignalrService } from 'src/app/_service/signal/signalr.service';
import {CommomService} from 'src/app/_service/commom/commom.service'


@Component({
  selector: 'app-shop',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  mixingTankVolume:number


  FillValve: boolean = false;
  DischargeValve: boolean = false;
  AutoMan:boolean=false;
  mixingTankLSH:boolean
  mixingTankLSL:boolean
  modelInformation:any;
  subscription: Subscription;
  firstUpdatData:any;
  FillValveValue:number=0;
  DischargeValveValue:number=0;

  LevelHighLimit:number
  LevelLowLimit:number;
  Setpoint:string;
  Ki:string;
  Kp:string;
  Kd:string;

  constructor(
    private dashboardService : DashboardService,
    private route: Router,
    public signalrService :SignalrService,
    private commomService:CommomService
  ) { }

  LimitChange(){
    this.dashboardService.nodeValueSubmitService("2-71", this.NodeShow(String(this.LevelHighLimit)))
    .subscribe(
      (data:any) => {
        if(data){
          this.dashboardService.nodeValueSubmitService("2-72", this.NodeShow(String(this.LevelLowLimit)))
    .subscribe( (data)=> {
      if(data){alert("Successfully")}
      else alert ("Please enter the limit value")
    })
        }
      }
    )

  }

  ngOnInit(): void {
    this.getStarted()
  }
  ngOnDestroy() {
    this.unSubcribeChartData();
    this.signalrService.hubConnection.off("askServerResponse");
  }

  getStarted(){
    this.firstUpdate()
    this.signalrService.startConnection();
    setTimeout(() => {
      this.signalrService.askServerListener();
    }, 2000);
  }

  subcribeChartData(){
    this.dashboardService.subcribeAllDashboardData()
    .subscribe((data:any)=>{
    })
  }

  unSubcribeChartData(){
    this.commomService.unSubcribeAllNode()
    .subscribe((data:any)=>{

    })
  }

  DischargeValveSubmit(){
    this.DischargeValve = this.signalrService.DischargeValve
    this.dashboardService.nodeValueSubmitService("2-80", this.NodeShow(String(this.signalrService.DischargeValve)))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  FillValveSubmit(){
    this.FillValveValue= this.signalrService.FillValve
    this.dashboardService.nodeValueSubmitService("2-77", this.NodeShow(String(this.signalrService.FillValve)))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  FillValveOpen(){
    if(this.signalrService.FillValve>0)return true;
    else return false
  }

  DischargeValveOpen(){
    if(this.signalrService.DischargeValve>0)return true;
    else return false
  }

  firstUpdate(){
    this.dashboardService.getFirstUpdate()
    .subscribe(
      (data:any) => {
        this.firstUpdatData = data;
        this.AutoMan= this.firstUpdatData.Auto_Man;
        this.Kp= this.firstUpdatData.PID_Kp;
        this.Ki = this.firstUpdatData.PID_Ki;
        this.Kd = this.firstUpdatData.PID_Kd;
        this.Setpoint = this.firstUpdatData.PID_Setpoint;
        this.LevelLowLimit = this.firstUpdatData.LevelMeter_LowLimit;
        this.LevelHighLimit = this.firstUpdatData.LevelMeter_HighLimit;
        this.unSubcribeChartData();
        this.updateTank();
        this.subcribeChartData()
      }
    )
  }

  PIDSetpointSubmit(){
    this.dashboardService.nodeValueSubmitService("2-98",this.Setpoint)
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  NodeShow(data:string)
  {
    var str = data+"";
    var obj = str.split(".",2);
    if(obj[1]) return obj[0]+","+obj[1]
    else return obj[0]
  }

  changeMode(){
    this.dashboardService.nodeValueSubmitService("2-91",String(this.AutoMan))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )

    this.dashboardService.nodeValueSubmitService("2-85","false")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )

    this.dashboardService.nodeValueSubmitService("2-87","false")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )

  }

  PIDParameterSubmit()
  {

    this.dashboardService.nodeValueSubmitService("2-101",this.NodeShow(this.Kd))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
    this.dashboardService.nodeValueSubmitService("2-99",this.NodeShow(this.Ki))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
    this.dashboardService.nodeValueSubmitService("2-100",this.NodeShow(this.Kp))
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  Start(){
    this.dashboardService.nodeValueSubmitService("2-85","true")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )

    this.dashboardService.nodeValueSubmitService("2-87","false")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  Stop()
  {
    this.dashboardService.nodeValueSubmitService("2-85","false")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )

    this.dashboardService.nodeValueSubmitService("2-87","true")
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  updateTank(){
    this.dashboardService.getAllModelData()
    .subscribe(
      (data: any) => {
        this.modelInformation = data;
        this.signalrService.LevelMeter =Math.round(this.modelInformation.LevelMeter.Output);
        this.signalrService.LevelMeterHighAlarm = this.modelInformation.LevelMeter.LevelMeter_HighAlarm;
        this.signalrService.LevelMeterLowAlarm = this.modelInformation.LevelMeter.LevelMeter_LowAlarm;
          this.signalrService.FillValve =Math.round(this.modelInformation.Valve.FillValve);
          this.signalrService.DischargeValve =Math.round(this.modelInformation.Valve.DischargeValve);
        this.signalrService.FlowMeter = Math.round(this.modelInformation.FlowMeter.Output*10);

    });
  }
}
