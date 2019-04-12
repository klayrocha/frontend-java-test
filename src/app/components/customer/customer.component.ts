import { Customer } from './../../model/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ResponseApi } from './../../model/response-api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  listCountries=[];
  listCustomer=[];
  customerFilter = new Customer('','','','','','',);

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.findAll(this.page,this.count);
    this.findAllCountries();
  }

  findAll(page:number,count:number) {
      this.customerService.findAll(page,count).subscribe((responseApi:ResponseApi) =>{
          this.listCustomer = responseApi['data']['content'];
          this.pages = new Array(responseApi['data']['totalPages']);
      }, err => {
        console.log('Erro findAll -->',err);
      });
  }

  filterFromPage(): void {
    this.page = 0;
    this.count = 5;
    this.filter();
  }

  filter(): void {
    this.customerService.findByParams(this.page,this.count,this.customerFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.customerFilter.countryCode = this.customerFilter.countryCode == 'uninformed' ? "" : this.customerFilter.countryCode;
      this.customerFilter.state = this.customerFilter.state == 'uninformed' ? "" : this.customerFilter.state;
      this.listCustomer = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      console.log('Erro filter -->',err);
    });
  }

  findAllCountries(){
    this.customerService.findAllCountries().subscribe((responseApi:ResponseApi) =>{
      this.listCountries = responseApi['data'];
    }, err => {
      console.log('Erro findAllCountries -->',err);
    });
  }

  cleanFilter(): void {
    this.page = 0;
    this.count = 5;
    this.customerFilter = new Customer('','','','','','',);
    this.findAll(this.page,this.count);
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      if(this.customerFilter.countryCode != '' || this.customerFilter.state != ''){
          this.filter();
      } else {
        this.findAll(this.page,this.count);
      }
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      if(this.customerFilter.countryCode != '' || this.customerFilter.state != ''){
          this.filter();
      } else {
        this.findAll(this.page,this.count);
      }
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    if(this.customerFilter.countryCode != '' || this.customerFilter.state != ''){
      this.filter();
    } else {
      this.findAll(this.page,this.count);
    }
  }
}
