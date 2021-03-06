import { Customer } from './../model/customer';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { JUMIA_API } from './jumiaphone.api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  findAll(page:number,count:number){
    return this.http.get(`${JUMIA_API}/api/phone/${page}/${count}`);
  }

  findAllCountries(){
    return this.http.get(`${JUMIA_API}/api/phone/countries`);
  }

  findByParams(page:number,count:number,c:Customer){
    c.country.code = c.country.code == '' ? "uninformed" : c.country.code;
    c.state = c.state == '' ? "uninformed" : c.state;
    return this.http.get(`${JUMIA_API}/api/phone/${page}/${count}/${c.country.code}/${c.state}`);
  }

  findChart(){
    return this.http.get(`${JUMIA_API}/api/phone/chart`);
  }
}
