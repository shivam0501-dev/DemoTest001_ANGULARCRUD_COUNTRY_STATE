import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../_services/state.service';
import { country } from '../_models/country';
import { status } from '../_models/Status';
import { CountryService } from '../_services/country.service';
declare var Swal: any;
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  ngOnInit(): void {
    this.BindCountry();
    this.initializationForm();
  }
  constructor(private _state:StateService,private fb:FormBuilder,private _country:CountryService){}
 stateForm:FormGroup=new FormGroup({});
  AllState:any;
  AllBindCountry:any;
  AddOrUpdateButton=false;

  initializationForm(){
    this.stateForm= this.fb.group({
      stateName:new FormControl('',[Validators.required]),
      CountryID:new FormControl('',[Validators.required]),

      stateCode:new FormControl('',[Validators.required]),
      stateId:new FormControl(''),
    });
    this.GetAllState();
    this.BindCountry();
  }
      
  BindCountry(){
    return this._country.getAllCountry().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.AllBindCountry=response;
      },
      error:(error:any)=>console.log(error.error)
    })
  }
  GetAllState(){
    return this._state.getAllState().subscribe({
      next:response=>{
       this.AllState=response;
      },
      error:error=>console.log(error.error)
    })
  }
  

  AddState(){
    console.log(this.stateForm.value);
      return this._state.AddState(this.stateForm.value).subscribe({
        next:response=>{
          if(response.statusCode==1){
            this.stateForm.reset();
            this.GetAllState();
            this.AddOrUpdateButton=false;
            Swal.fire({ title: "Added!", text: response.message, icon: "success" });
          }
          else{
            Swal.fire({ title: "Deleted!", text: response.message, icon: "error" });
          }
        },
        error:error=>console.log(error.error)
      }) 
  }
  EditState(Id:number){
    return this._state.GetStateByid(Id).subscribe({
      next:response=>{
        this.stateForm.reset();
        this.stateForm.controls["stateId"].setValue(response.stateId);
        this.stateForm.controls["CountryID"].setValue(response.countryID);
        this.stateForm.controls["stateCode"].setValue(response.stateCode);
        this.stateForm.controls["stateName"].setValue(response.stateName);

        this.AddOrUpdateButton=true;
      },
      error:error=>console.log(error.error)
    })
  }
  DeleteState(Id:number){

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
        return this._state.DeleteState(Id).subscribe({
          next: response => {
            if (response.statusCode == 1) {
              Swal.fire({ title: "Deleted!", text: response.message, icon: "success" });
              this.GetAllState();
            } else {
              Swal.fire({ title: "Deleted!", text: response.message, icon: "error" });
            }
          },
          error: error => console.log(error)
        });
      }
    
      return null; 
    });
    

    
    
  }
  UpdateState(){
    return this._state.updateState(this.stateForm.value).subscribe({
      next:response=>{
        if(response.statusCode==1){
          this.stateForm.reset();
          this.GetAllState();
          Swal.fire({ title: "Updated!", text: response.message, icon: "success" });
        }
        else{
          Swal.fire({ title: "Updated!", text: response.message, icon: "error" });
        }
      },
      error:error=>alert(error.error)
    })
  }
}
