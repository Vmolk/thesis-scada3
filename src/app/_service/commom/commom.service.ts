import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http'
import {API_PATH} from '../../_utils/api'
@Injectable({
  providedIn: 'root'
})
export class CommomService {

  constructor(
    private http : HttpClient
  ) { }

  unSubcribeAllNode():Observable <Object>
  {
    const data="{\"topic\": \"Charts\",\"brokerUrl\": \"signalr:https://localhost:5001/charts\"}"
    return this.http.post(API_PATH.DATA_VISUAL.UNSUBCRIBE_CHARTS,data);
  }

  updateDatabase():Observable <Object>
  {
    return this.http.get<any>(API_PATH.COMMOM.UPDATE_DATABASE)
  }
}
