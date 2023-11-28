import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { country } from '../_models/country';
import { status } from '../_models/Status';
import { State } from '../_models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  baseurl = 'https://localhost:7179/api/';
  constructor(private http:HttpClient) { }

  getAllState():Observable<any>{
    return this.http.get(this.baseurl+'State/GetAllState').pipe(
      map((response)=>{
          return response;
      })
    )
  }
  AddState(model:any){
    return this.http.post<status>(this.baseurl+'State/AddState',model).pipe(
      map((response)=>{
          return response;
      })
    )
  }
  DeleteState(Id:number){
    return this.http.delete<status>(this.baseurl+'State/DeleteState?Id='+ Id).pipe(
      map((response)=>{
        return response;
      })
    )
  }
  GetStateByid(Id:number){
    return this.http.get<any>(this.baseurl+'State/GetStateById?Id='+Id).pipe(
      map((response)=>{
        return response;
      })
    )
  }
  updateState(model:any){
    return this.http.put<status>(this.baseurl+'State/UpdateState',model).pipe(
      map((response)=>{
        return response;
      })
    )
  }
}
