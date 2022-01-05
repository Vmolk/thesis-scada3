import { Component, OnInit, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      },
      {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-browse-node',
  templateUrl: './browse-node.component.html',
  styleUrls: ['./browse-node.component.css']
})
export class BrowseNodeComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  @Input() browseNode:any;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
