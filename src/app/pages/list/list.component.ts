import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

import { DATA_AGENCIAS } from 'src/app/data/DataAgencias';
import { Agencia } from 'src/app/interfaces/Agencias';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public agencias: Agencia[] = [];

  constructor() { }

  ngOnInit(): void {

    

    if( localStorage.getItem('agencias') === null){
      this.agencias = DATA_AGENCIAS;
    }else{
      let data = JSON.parse(localStorage.getItem("agencias") as string);
      this.agencias = data;
    }
    
    localStorage.setItem('agencias', JSON.stringify(this.agencias));
  }

  get ramdomImg(){
    
    return Math.round(Math.random() * (5 - 1) + 1);
  }

  edit(index:number){
    console.log(this.agencias[index]);
  }

}
