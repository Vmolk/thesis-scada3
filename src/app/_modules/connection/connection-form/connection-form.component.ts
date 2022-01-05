import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {PeopleService} from '../people.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

export interface BrowseNode {
  id:string;
  NodeName: string;
  NodeId:string;
  value?:string;
  children:boolean;
  childrenNode:BrowseNode[]
}

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})


export class ConnectionFormComponent implements OnInit {

  today!:string;
  Function: any;
  serverUrl:string;
  NodeData:any;
  treeControl = new NestedTreeControl<BrowseNode>(node => node.childrenNode);
  dataSource :any = new MatTreeNestedDataSource<BrowseNode>();

  endpoints:any[]=[];
  endpointUrl:string;
  Security:any ="None";
  constructor(
    private peopleService : PeopleService
  ) {
  }

  ngOnInit(): void {
    this.dataSource.data = null
    const now = moment();
    this.today = now.format('YYYY-MM-DD hh:mm');
    const serverUrl = localStorage.getItem("SERVER_URL");
    if(serverUrl) this.serverUrl = serverUrl;
  }
  hasChild = (_: number, node: BrowseNode) => !!node.children;


  ServerDisconnect()
  {
    this.peopleService.ServerDisconnect()
    .subscribe ((data:any)=>{
      console.log(data);
    })
    this.dataSource.data = null;
  }

  OnSubmit(){
    if(this.Security === "None") this.fetchPeople(this.serverUrl,false);
    else this.fetchPeople(this.serverUrl,true);
    localStorage.setItem("SERVER_URL", this.serverUrl);
    console.log(this.Security);
  }

  Getendpoints(serverUrl:string){
    this.endpoints =[];
    this.peopleService.Getendpoint(serverUrl)
    .subscribe(
      (data:any)=>{
        for(let i=0; i<data.length;i++){
          const obj = data[i].EndpointUrl.split(":")
          if(obj[0]!=="https") {
            this.endpointUrl = data[i].EndpointUrl;
            if (data[i].SecurityMode === 1) this.endpoints.push("None");
            if(data[i].SecurityMode === 2){
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic128Rsa15") this.endpoints.push("Basic128Rsa15-Sign")
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic256") this.endpoints.push("Basic256-Sign")
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic256Sha256") this.endpoints.push("Basic256Sha256-Sign")
            }
            if(data[i].SecurityMode === 3){
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic128Rsa15") this.endpoints.push("Basic128Rsa15 - Sign & Encrypt")
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic256") this.endpoints.push("Basic256 - Sign & Encrypt")
              if(data[i].SecurityPolicyUri==="http://opcfoundation.org/UA/SecurityPolicy#Basic256Sha256") this.endpoints.push("Basic256Sha256 - Sign & Encrypt")
            }
          }
        }
      })
  }

  nodeValue:string;



  browseData:any[]= [];
  subdata:any;
  fetchPeople(serverUrl:string, useSecurity:boolean)
  {
    this.peopleService.fetchPeople(serverUrl,useSecurity)
    .subscribe(
      (data: any) => {
        this.browseData=[]
        for(let i=0; i< data.currentView.length;i++)
        {
          this.browseData.push({id:i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView, value:data.value})
        }
        this.subdata= this.browseData;
        this.dataSource.data=this.subdata;
      });

  }

  expandData= new Array<BrowseNode>();
  ExpandNode(node_id:string,id:string)
  {
    this.expandData=[]
    var obj = id.split("-");
    if(obj.length === 1)
    {
      var _id = parseInt(obj[0]);
      if(!this.browseData[_id].childrenNode) {
        this.peopleService.expandNode(node_id)
        .subscribe(
          (data:any) => {
            this.expandData=[];
            for(let i=0; i< data.currentView.length;i++)
            {
              this.expandData.push({id:obj[0]+"-"+i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView,value:data.value});
            }
            this.browseData[_id].childrenNode = this.expandData;
            this.subdata= this.browseData;
            this.dataSource.data = null;
            this.dataSource.data=this.subdata;
          }
        )
      }
    }

    if(obj.length === 2)
    {
      var _id = parseInt(obj[0]);
      var _id1 = parseInt(obj[1]);
      if(!this.browseData[_id].childrenNode[_id1].childrenNode) {
        this.peopleService.expandNode(node_id)
        .subscribe(
          (data:any) => {
            this.expandData=[];
            for(let i=0; i< data.currentView.length;i++)
            {
              this.expandData.push({id:obj[0]+"-"+obj[1]+"-"+i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView,value:data.value});
            }
            this.browseData[_id].childrenNode[_id1].childrenNode = this.expandData;
            this.subdata= this.browseData;
            this.dataSource.data = null;
            this.dataSource.data=this.subdata;
          }
        )
      }
    }

    if(obj.length === 3)
    {
      var _id = parseInt(obj[0]);
      var _id1 = parseInt(obj[1]);
      var _id2 = parseInt(obj[2]);
      if(!this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode) {
        this.peopleService.expandNode(node_id)
        .subscribe(
          (data:any) => {
            this.expandData=[];
            for(let i=0; i< data.currentView.length;i++)
            {
              this.expandData.push({id:obj[0]+"-"+obj[1]+"-"+obj[2]+"-"+i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView});
            }
            this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode = this.expandData;
            this.subdata= this.browseData;
            this.dataSource.data = null;
            this.dataSource.data=this.subdata;
          }
        )
      }
    }
    if(obj.length === 4)
    {
      var _id = parseInt(obj[0]);
      var _id1 = parseInt(obj[1]);
      var _id2 = parseInt(obj[2]);
      var _id3 = parseInt(obj[3]);
      if(!this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode[_id3].childrenNode) {
        this.peopleService.expandNode(node_id)
        .subscribe(
          (data:any) => {
            this.expandData=[];
            for(let i=0; i< data.currentView.length;i++)
            {
              this.expandData.push({id:obj[0]+"-"+obj[1]+"-"+obj[2]+"-"+obj[3]+"-"+i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView});
            }
            this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode[_id3].childrenNode = this.expandData;
            this.subdata= this.browseData;
            this.dataSource.data = null;
            this.dataSource.data=this.subdata;
          }
        )
      }
    }
    if(obj.length === 5)
    {
      var _id = parseInt(obj[0]);
      var _id1 = parseInt(obj[1]);
      var _id2 = parseInt(obj[2]);
      var _id3 = parseInt(obj[3]);
      var _id4 = parseInt(obj[4]);
      if(!this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode[_id3].childrenNode[_id4].childrenNode) {
        this.peopleService.expandNode(node_id)
        .subscribe(
          (data:any) => {
            this.expandData=[];
            for(let i=0; i< data.currentView.length;i++)
            {
              this.expandData.push({id:obj[0]+"-"+obj[1]+"-"+obj[2]+"-"+obj[3]+"-"+obj[4]+"-"+i.toString(), NodeName : data.currentView[i].NodeName, NodeId: data.currentView[i].id,children: data.currentView[i].children, childrenNode: data.currentView[i].childrenNode?.currentView});
            }
            this.browseData[_id].childrenNode[_id1].childrenNode[_id2].childrenNode[_id3].childrenNode[_id4].childrenNode = this.expandData;
            this.subdata= this.browseData;
            this.dataSource.data = null;
            this.dataSource.data=this.subdata;
          }
        )
      }
    }
  }

  NodeShow(NodeId:string)
  {
    var obj = NodeId.split(";",2);
    if(obj[1])
      NodeId =obj[0].split("=",2)[1]+"-"+obj[1].split("=",2)[1]
    else
      NodeId="0-"+obj[0].split("=",2)[1];
    this.peopleService.NodeData(NodeId)
    .subscribe(
      (data:any) => {
        this.NodeData = data;
      }
    )
  }

  nodeValueSubmit(nodeId:string,nodeValue:string){
    if(nodeValue){
      this.peopleService.nodeValueSubmitService(nodeId,nodeValue).
      subscribe(
        (data:any) => {
          if(data)
          {
            alert("Write successfully");
            this.NodeData.value = nodeValue;
            this.nodeValue = '';

          }
          else alert("Write faile")
        }
      )
    }
    else alert("Node value can not be null")
  }

}


