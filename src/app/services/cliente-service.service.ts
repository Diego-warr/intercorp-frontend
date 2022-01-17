import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResponseDTO} from "../dto/ResponseDTO";
import {ClienteResponseDTO} from "../dto/ClienteResponseDTO";
import {ClienteBodyDTO} from "../dto/ClienteBodyDTO";
import {KpiClientesDTO} from "../dto/KpiClientesDTO";

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private listClientesApi = `${environment.HOST}/cliente/listclientes`;
  private nuevoClienteApi = `${environment.HOST}/cliente/creacliente`;
  private kpiClientesapi = `${environment.HOST}/cliente/kpideclientes`;

  constructor(private httpclient : HttpClient) {

  }


  public listClientes(){
    return this.httpclient.get<ResponseDTO<ClienteResponseDTO[]>>(`${this.listClientesApi}`)
  }

  public nuevoCliente(clienteBodyDTO : ClienteBodyDTO){
    return this.httpclient.post<ResponseDTO<any>>(this.nuevoClienteApi, clienteBodyDTO);
  }

  public kpiClientes(){
    return this.httpclient.get<ResponseDTO<KpiClientesDTO>>(`${this.kpiClientesapi}`)
  }

}
