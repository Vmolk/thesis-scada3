import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';





  @Injectable()
export class PeopleService {
  constructor(
    private http:HttpClient,
    ){}
  httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  fetchPeople(serverUrl:string, useSecurity:boolean) :Observable <Object>{
    const data = "{\"serverUrl\":\""+ serverUrl+"\",\"useSecurity\":\""+useSecurity+"\"}"
    return this.http.post<any>('http://localhost:5000/Api/data-sets/route',data,this.httpOptions)
  }

  nodeValueSubmitService(nodeId:string,data:string): Observable <Object>
  {
    const _data = "\""+data +"\""
    return this.http.post<any>('http://localhost:5000/Api/data-sets/nodes/'+nodeId,_data,this.httpOptions)
  }

  nodeValueMonitor(nodeId:string): Observable <Object>
  {
    const data = "\""+nodeId +"\""
    return this.http.post<any>('http://localhost:5000/Api/data-sets/nodes/'+nodeId,data,this.httpOptions)
  }


  expandNode(node_id:string):Observable <Object>{
    const data = "\""+node_id +"\"";
    return this.http.post<any>('http://localhost:5000/Api/data-sets/route/expand',data, this.httpOptions)
  }

  NodeData(node_id:string):Observable <Object>{
    return this.http.get<any>('http://localhost:5000/Api/data-sets/nodes/'+node_id)
  }

  Getendpoint(serverUrl:string):Observable <Object>{
    const data = "\""+serverUrl +"\"";
    return this.http.post<any>('https://localhost:5001/Api/get-endpoints',data, this.httpOptions);
  }
  ServerDisconnect():Observable <Object>
  {
    return this.http.get<any>('http://localhost:5000/Api/disconnect')
  }

}
