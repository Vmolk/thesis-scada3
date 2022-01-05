import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http'
import {API_PATH} from '../../_utils/api'
@Injectable({
  providedIn: 'root'
})
export class DataVisualService {

  constructor(
    private http : HttpClient
  ) { }

  getDataInPeriodTime(startTime:string, stopTime:string):Observable <Object>
  {
    const data = "{\"startTime\":\""+ startTime+"\",\"stopTime\":\""+stopTime+"\"}"
    return this.http.post(API_PATH.DATA_VISUAL.GET_DATA_IN_PERIOD,data);
  }

  getSubcribeAllNode():Observable <Object>
  {
    return this.http.get(API_PATH.DATA_VISUAL.SUBCRIBE_CHARTS);
  }

  unSubcribeAllNode():Observable <Object>
  {
    const data="{\"topic\": \"Charts\",\"brokerUrl\": \"signalr:https://localhost:5001/charts\"}"
    return this.http.post(API_PATH.DATA_VISUAL.UNSUBCRIBE_CHARTS,data);
  }

}
