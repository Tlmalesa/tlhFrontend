import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  BASE_URL: string = 'http://localhost:3000';

	
	constructor(private  http: HttpClient) { }

  contactMe(userDetail:any)
	{
		console.log(userDetail)
		return this.http.post(`${this.BASE_URL}/contact-us/`,userDetail) ;
	}

}
