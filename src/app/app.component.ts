import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {CommomService} from 'src/app/_service/commom/commom.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  gaugeType = "semi";
    gaugeValue = 28.3;
    gaugeLabel = "Speed";
    gaugeAppendText = "km/hr";
  title = 'SCADA';

  constructor(
  private commomService:CommomService
  ){}
  subscription: Subscription;
  ngOnInit(): void {

    //  const source = interval(10000);
    //  this.subscription = source.subscribe(val => this.updateDatabase());
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    this.commomService.unSubcribeAllNode()
    .subscribe(
      (data:any) =>{
        console.log(data);
      }
    )
    localStorage.removeItem("SERVER_URL");
  }


  updateDatabase(){
    this.commomService.updateDatabase()
    .subscribe(
      (data: any) => {

    });
  }
}
