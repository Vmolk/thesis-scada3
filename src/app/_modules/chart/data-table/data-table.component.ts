import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {DataVisualService} from '../../../_service/data-visual/data-visual.service';
import * as XLSX from 'xlsx';
import { TableUtil } from "./tableUtils";
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  people:any;
  readList:any;
  byLoginList:any;
  startDate:Date;
  stopDate:Date;
  dataSource:any;

  ngOnInit(): void {
  }
  constructor(
    private dataVisualService:DataVisualService
  ){
  }

  GetData(){
    let _stopTime = this.stopDate.getFullYear()+"-"+ Number(this.stopDate.getMonth()+1)+"-"+this.stopDate.getDate()+" 23:59:59";
    let _startTime = this.startDate.getFullYear()+"-"+ Number(this.startDate.getMonth()+1)+"-"+this.startDate.getDate()+" 00:00:00";
    console.log(_stopTime);
    console.log(_startTime);
    this.dataVisualService.getDataInPeriodTime(_startTime,_stopTime)
    .subscribe(
      (data:any) => {
        this.dataSource=new MatTableDataSource(data);
      }
    )
  }

  formatDataSource(){
    return this.dataSource
  }

  DateTimeFormat(_datetime:string){
    var obj = _datetime.split("T")
    return obj[0]+" "+obj[1].split(".")[0]
    //return datetime.getFullYear()+"/"+ Number(datetime.getMonth()+1)+"/"+datetime.getDate()+" "+datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds()
  }

  ExportExcel(){
    TableUtil.exportTableToExcel("TankTable","TankTableData");
  }
  displayedColumns: string[] = ['#', 'datetime', 'levelmeter', 'levelmeterhighalarm','levelmeterlowalarm', 'flowmeter', 'flowmeterhighalarm', 'flowmeterlowalarm','fillvalve','dischargevalve'];
}
