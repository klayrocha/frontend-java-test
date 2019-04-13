import { Country } from './../../model/country';
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
  customerFilter = new Customer('','','',new Country('', ''),'');
  dataSource: Object;
  chartConfig: Object;
  charts=[];
  showTable:boolean = true;

  constructor(
    private customerService: CustomerService
  ) { 
    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };
  }

  ngOnInit() {
    this.showTable = true;
    this.findAll(this.page,this.count);
    this.findAllCountries();
    this.findChart();
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
    this.showTable = true;
    this.page = 0;
    this.count = 5;
    this.filter();
  }

  filter(): void {
    this.customerService.findByParams(this.page,this.count,this.customerFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.customerFilter.country.code = this.customerFilter.country.code == 'uninformed' ? "" : this.customerFilter.country.code;
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

  findChart() {
    this.customerService.findChart().subscribe((responseApi:ResponseApi) =>{
        this.charts = responseApi['data'];
    }, err => {
      console.log('Erro findChart -->',err);
    });
  }

  showChart(){
    this.showTable = false;
    this.dataSource = {
      "chart": {
        "caption": "Countries with the amount phones",
        "subCaption": "Phones records in database",
        "xAxisName": "Country",
        "yAxisName": "Phones (Amount)",
        "numberSuffix": "",
        "theme": "fusion",
      },
      "data": this.charts
    };
  }

  cleanFilter(): void {
    this.showTable = true;
    this.page = 0;
    this.count = 5;
    this.customerFilter = new Customer('','','',new Country('', ''),'',);
    this.findAll(this.page,this.count);
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      if(this.customerFilter.country.code != '' || this.customerFilter.state != ''){
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
      if(this.customerFilter.country.code != '' || this.customerFilter.state != ''){
          this.filter();
      } else {
        this.findAll(this.page,this.count);
      }
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    if(this.customerFilter.country.code != '' || this.customerFilter.state != ''){
      this.filter();
    } else {
      this.findAll(this.page,this.count);
    }
  }
}
