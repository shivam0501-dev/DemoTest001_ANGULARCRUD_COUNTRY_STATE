import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../_services/country.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { status } from '../_models/Status';
declare var Swal: any;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  CountryForm:FormGroup=new FormGroup({});
  AddOrUpdateButton=false;
  AllCountrys:any;
  
  ngOnInit(): void {
    this.initializationForm();
    this.getAllCountry();
  }

  constructor(private _country:CountryService,private fb:FormBuilder) {
  }

  initializationForm(){
    this.CountryForm= this.fb.group({
      CountryName:new FormControl('',[Validators.required]),
      CountryCode:new FormControl('',[Validators.required]),
      CountryId:new FormControl(''),
    });
  }

  getAllCountry(){
    return this._country.getAllCountry().subscribe({
      next:response=>{
       this.AllCountrys=response;
      },
      error:error=>console.log(error.error)
    })
  }
  

  AddCountry(){
      return this._country.AddCountry(this.CountryForm.value).subscribe({
        next:response=>{
          if(response.statusCode==1){
            this.CountryForm.reset();
            this.getAllCountry();
            this.AddOrUpdateButton=false;
            Swal.fire({ title: "Added!", text: response.message, icon: "success" });
          }
          else{
            Swal.fire({ title: "Added!", text: response.message, icon: "error" });
          }
        },
        error:error=>console.log(error.error)
      }) 
  }
  EditCountry(Id:number){
    return this._country.GetCountryByid(Id).subscribe({
      next:response=>{
        this.CountryForm.reset();
        this.CountryForm.controls["CountryName"].setValue(response.countryName);
        this.CountryForm.controls["CountryCode"].setValue(response.countryCode);
        this.CountryForm.controls["CountryId"].setValue(response.countryId);
        this.AddOrUpdateButton=true;
        console.log(response);
      },
      error:error=>console.log(error.error)
    })
  }
  DeleteCountry(Id:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result: any) => {
      if (result.isConfirmed) {
        return this._country.DeleteCountry(Id).subscribe({
          next:response=>{
            if(response.statusCode==1){
            Swal.fire({ title: "Deleted!", text: response.message, icon: "success" });

            this.getAllCountry(); }
            else
            Swal.fire({ title: "Deleted!", text: response.message, icon: "error" });
          },
          error:error=>console.log(error)
        })
      }
      return null; 
    });
     
  }
  UpdateCountry(){
    return this._country.updateCountry(this.CountryForm.value).subscribe({
      next:response=>{
        if(response.statusCode==1){
          this.CountryForm.reset();
          this.getAllCountry();
          Swal.fire({ title: "Updated!", text: response.message, icon: "success" });
        }
        else{
          Swal.fire({ title: "DeleUpdated!", text: response.message, icon: "error" });
        }
      },
      error:error=>alert(error.error)
    })
  }
}
