import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mixing-tank',
  templateUrl: './mixing_tank.component.html',
  styleUrls: ['./mixing_tank.component.scss']
})
export class MixingTankComponent implements OnInit {
  @Input() tankVolume: number
  @Input() tankColour:any
  @Input() highState:boolean
  @Input() lowState:boolean
  @Input() tankName:string
  constructor() { }

  ngOnInit(): void {

  }
  gaugeType:any = "arch";
  gaugeLabel:string = "cm";
  gaugeThick:any = 23;
  gaugeCap: any ="round"
}
