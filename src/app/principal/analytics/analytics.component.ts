import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {ClienteServiceService} from "../../services/cliente-service.service";
import {KpiClientesDTO} from "../../dto/KpiClientesDTO";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  kpiClientes : KpiClientesDTO = {
    promedioEdad : 0.0,
    desviacionStandar : 0.0
  }

  loading = false;

  constructor(private router: Router,
              private clienteService : ClienteServiceService,) { }


  ngOnInit(): void {
    this.showKpiClientes()
  }

  showKpiClientes(){
    this.clienteService.kpiClientes().subscribe(
      next=>{
        if(next.status=="OK"){
          this.kpiClientes = next.data!;
          this.loading=false
        }
      },
      error => {
        this.loading=false
      }
    );
  }

  recargar(){
    this.kpiClientes.promedioEdad=0.0
    this.kpiClientes.desviacionStandar=0.0
    this.loading=true
    this.showKpiClientes()
  }

  volverInicio(){
    this.router.navigate(['principal']);
  }
}
