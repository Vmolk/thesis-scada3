import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  public data:any;
  public FillValve:any;
  public DischargeValve:any=12;
  public LevelMeter:any;
  public FlowMeter:any;
  public LevelMeterHighAlarm:any;
  public LevelMeterLowAlarm:any;
    constructor(
        ) { }


    hubConnection:signalR.HubConnection;

    startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:5001/charts', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

        this.hubConnection
        .start()
        .then(() => {
            console.log('Hub Connection Started!');
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    FloatFormat(data:string)
    {
      var str = data+"";
      var obj = str.split(",",2);
      if(obj[1]) return obj[0]+"."+obj[1]
      else return obj[0]
    }
    askServerListener() {
        this.hubConnection.on("askServerResponse", (data) => {
          console.log(data);
            this.data = data;
            if(data.nodeId==="2-108") this.FlowMeter =Math.round(parseFloat(this.FloatFormat(data.value))*10);
            if(data.nodeId==="2-80") this.DischargeValve = Math.round(parseFloat(this.FloatFormat(data.value)));
            if(data.nodeId==="2-70") this.LevelMeter =Math.round(parseFloat(this.FloatFormat(data.value)));
            if(data.nodeId==="2-77") this.FillValve = Math.round(parseFloat(this.FloatFormat(data.value)));
            if(data.nodeId==="2-73") this.LevelMeterHighAlarm = data.value === "True"?true:false;
            if(data.nodeId==="2-74") this.LevelMeterLowAlarm =data.value === "True"?true:false;;
        })
    }
}
