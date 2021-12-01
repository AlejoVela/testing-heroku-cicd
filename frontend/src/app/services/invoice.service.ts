import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  env:string;
  constructor( private _http: HttpClient) {
    this.env=environment.apiEndpoint
   }

   getInvoices(){
     return this._http.get<any>(this.env+'invoice')
   }
}