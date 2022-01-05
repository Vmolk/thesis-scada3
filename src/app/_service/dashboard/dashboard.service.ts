import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http'
import {API_PATH} from '../../_utils/api'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http : HttpClient
  ) { }


  getAllModelData() :Observable <Object>
  {
    return this.http.get<any>(API_PATH.DASHBOARD.GET_ALL_DATA)
  }

  nodeValueSubmitService(nodeId:string,data:string): Observable <Object>
  {
    const _data = "\""+data +"\""
    return this.http.post<any>(API_PATH.DASHBOARD.SUBMIT_DATA+nodeId,_data)
  }

  getFirstUpdate() :Observable <Object>
  {
    return this.http.get<any>(API_PATH.DASHBOARD.FIRST_UPDATE)
  }

  subcribeAllDashboardData():Observable <Object>
  {
    return this.http.get<any>(API_PATH.DASHBOARD.SUBCRIBE_ALL)
  }

}
