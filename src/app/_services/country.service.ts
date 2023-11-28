import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { status } from '../_models/Status';
import { country } from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseurl = 'https://localhost:7179/api/';
  constructor(private http:HttpClient) { }

  getAllCountry():Observable<any>{
    return this.http.get(this.baseurl+'Country/GetAllCountry').pipe(
      map((response)=>{
          return response;
      })
    )
  }
  AddCountry(model:any){
    return this.http.post<status>(this.baseurl+'Country/AddCountry',model).pipe(
      map((response)=>{
          return response;
      })
    )
  }
  DeleteCountry(Id:number){
    return this.http.delete<status>(this.baseurl+'Country/DeleteCountry?Id='+ Id).pipe(
      map((response)=>{
        return response;
      })
    )
  }
  GetCountryByid(Id:number){
    return this.http.get<any>(this.baseurl+'Country/GetCountryById?Id='+Id).pipe(
      map((response)=>{
        return response;
      })
    )
  }
  updateCountry(model:any){
    return this.http.put<status>(this.baseurl+'Country/UpdateCountry',model).pipe(
      map((response)=>{
        return response;
      })
    )
  }
}
