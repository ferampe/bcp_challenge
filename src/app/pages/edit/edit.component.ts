import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Agencia } from 'src/app/interfaces/Agencias';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  agencias: Agencia[] = [];
  agencia!:Agencia;
  index!:number;

  showMensaje:boolean = false;

  @ViewChild('customLoadingTemplate', { static: false })

  loadingTemplate!: TemplateRef<any>;
  loading:boolean = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  form = this.fb.group({
    nombreAgencia: [''],
    direccion:[''],
    distrito:[''],
    latitud:[''],
    longitud:['']

  })

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {


   }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      console.log(typeof(params.get("id")));

      this.index = parseInt(params.get("id") as string);

      let data = JSON.parse(localStorage.getItem("agencias") as string);

      this.agencias = data;

      this.form.controls.nombreAgencia.setValue(this.agencias[this.index].agencia);
      this.form.controls.direccion.setValue(this.agencias[this.index].direccion);
      this.form.controls.distrito.setValue(this.agencias[this.index].distrito);
      this.form.controls.latitud.setValue(this.agencias[this.index].lat);
      this.form.controls.longitud.setValue(this.agencias[this.index].lon);

    })   

  }

  onSubmit(){

    this.loading = true;

    setTimeout(() => {
      this.agencias[this.index].agencia = this.form.controls.nombreAgencia.value;
      this.agencias[this.index].direccion = this.form.controls.direccion.value;
      this.agencias[this.index].distrito = this.form.controls.distrito.value;
      this.agencias[this.index].lat = this.form.controls.latitud.value;
      this.agencias[this.index].lon = this.form.controls.longitud.value;

      localStorage.setItem('agencias', JSON.stringify(this.agencias));
      this.showMensaje = true;
      this.loading = false;
    }, 1000);
    
    

  }

}
