import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ClienteServiceService} from "../../services/cliente-service.service";
import {ClienteResponseDTO} from "../../dto/ClienteResponseDTO";
import {UtilsMethods} from "../../utils/UtilsMethods";
import {ClienteBodyDTO} from "../../dto/ClienteBodyDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {

  nombreFormControl = new FormControl('', [Validators.required]);
  apellidosFormControl = new FormControl('',[Validators.required]);
  fechaNacimientoFormControl = new FormControl('', [Validators.required])

  displayedColumns = ['idCliente','nombre', 'apellido', 'fechaNacimiento', 'fechaProblableDeMuerte'];

  clientes : ClienteResponseDTO[] = [];

  loading = false

  cliente : ClienteBodyDTO={
    nombre :"",
    apellido : "",
    fechaNacimiento : ""
  }

  validar = true;
  habilitarBtnGuardar=false


  constructor(
    private clienteService : ClienteServiceService,
    private router: Router,) {

  }

  ngOnInit(): void {

    this.getListClientesFromService();
  }


  private validarCampos() : boolean{


    this.nombreFormControl.valid ? this.cliente.nombre=this.nombreFormControl.value : this.validar=false

    this.apellidosFormControl.valid ? this.cliente.apellido=this.apellidosFormControl.value : this.validar=false

    this.fechaNacimientoFormControl.valid ? this.cliente.fechaNacimiento = this.fechaNacimientoFormControl.value : this.validar=false

    return this.validar;
  }


  getListClientesFromService(){

    this.clientes = [];

    this.clienteService.listClientes().subscribe(
      next=>{
        if(next.status=="OK"){
          console.log(next.data!);

          this.clientes = next.data!.sort((a,b)=>0-(a.idCliente>b.idCliente? 1 : -1));
        }
      },
      error => {

      }
    );
  }


  crearNuevoCliente(){

    this.loading=true
    if(this.validarCampos()){
      console.log(this.cliente)
      this.clienteService.nuevoCliente(this.cliente).subscribe(
        next=>{
          if(next.status=="OK"){
            this.getListClientesFromService()
            this.clearData()
            this.loading=false
          }
        },
        error => {
          this.loading=false
        }
      );
    }else {
      console.log("error")
      this.loading=false
    }
  }


  private clearData(){
    this.nombreFormControl.reset()
    this.apellidosFormControl.reset()
    this.fechaNacimientoFormControl.reset()
  }

  irEstadisticas(){
    this.router.navigate(['estadisticas']);
  }


  parseDate(fecha : Date){
    return UtilsMethods.getDateformat(fecha)
  }

}

