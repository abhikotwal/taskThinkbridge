import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from './../../../app/shared/Services/data.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private DataServices : DataService,private router: Router ) { }

  currentPage: any;
  noofrecordsperpage: any;
  totalrecord: any;
  Inventories :any;
  InventoriesSlice: any;
  myDIV: boolean = false;
  ngOnInit(): void {
debugger
   if(sessionStorage.getItem('Islogin') == 'true')
   {
    this.Inventories = this.DataServices.getInventory();
    var maxdi =Math.max.apply(Math, this.Inventories.map(function(o:any) { return o.Pcode; }))

    this.totalrecord = this.Inventories.length;
    this.noofrecordsperpage = 10;
    this.currentPage = 1;
    this.InventoriesSlice = this.Inventories.slice(0, this.noofrecordsperpage)
   }
   else{
    this.router.navigate(['page']);
   }
   
  }

  DeleteData(row)
  {
   

this.DataServices.deletedata(row.Pcode)
this.Inventories = []
this.Inventories = this.DataServices.getInventory();
console.log(this.Inventories)

alert('Deleted Sucessfully')
this.InventoriesSlice = this.Inventories.slice(0, this.noofrecordsperpage)
  }

  AddInventory()
  {
    this.DataServices.SetInvData('');
    this.router.navigate(['page/Common/AdData']);
  }


  receiveMessage(Event :any)
  {
    alert('call')
  }
  shohidefilters() {
    if (this.myDIV) {
      this.myDIV = false

    }
    else {
      this.myDIV = true
    }
  }
pageno :any
  pageChange(page: any) {
    debugger
    this.pageno = page;
    let end = page * this.noofrecordsperpage;
    let start = end - this.noofrecordsperpage;
    this.InventoriesSlice = this.Inventories.slice(start, end)
  }

  EditData(row)
  {
    this.DataServices.SetInvData(row);
    
    this.router.navigate(['page/Common/AdData']);
  }

}
