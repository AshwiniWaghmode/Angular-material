import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patients } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url = 'http://localhost:3000/records';


  constructor(private http: HttpClient) { }

  getPatient()
  {
    return this.http.get<Patients[]>(this.url);
  }

  postPatient(pat: Patients)
  {
    return this.http.post<Patients>(this.url, pat);
  }

  editPatient(id:number, pat: Patients)
  {
    return this.http.put<Patients>(this.url+'/'+id , pat);
  }


  deletePatient(id:number){
    return this.http.delete<Patients>(this.url+'/'+id);
  }
}
