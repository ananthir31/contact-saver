import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/shared/api.service';
import { DashboardModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  dashboardModelObj : DashboardModel = new DashboardModel();
  dashboardData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api: ApiService) {
   }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      sino:[''],
      name :[''],
      phoneno:[''],
    })
    this.getContact();
  }
  clickAddContact(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postDashboardDetails(){
    this.dashboardModelObj.name = this.formValue.value.name;
    this.dashboardModelObj.phoneno = this.formValue.value.phoneno;
    this.dashboardData
    this.api.postContact(this.dashboardModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Contact added successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getContact();
    },
    (err:any)=>{
      alert("Something went wrong")
    })
  }
  getContact(){
    this.api.getContact()
    .subscribe(res=>{
    this.dashboardData=res;
    })
  }
  deleteContact(row : any){
    this.api.deleteContact(row.id)
    .subscribe(res=>{
      alert("Contact Deleted")
      this.getContact();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.dashboardModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phoneno'].setValue(row.phoneno);
  }
  updatepostDashboardDetails(){
    this.dashboardModelObj.name = this.formValue.value.name;
    this.dashboardModelObj.phoneno = this.formValue.value.phoneno;
    this.api.updateContact(this.dashboardModelObj,this.dashboardModelObj.id)
    .subscribe(res=>{
      alert("updated successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getContact();
      })
  }
}
