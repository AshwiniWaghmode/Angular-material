import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Patients } from './models/patient.model';
import { PatientService } from './service/patient.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  display = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'contact'
  ];

  @Input() patient: Patients ;

  title = 'task3';

  searchString = '';
  patientForm: FormGroup;

  name : any;
  //patient : Patients[];
  dataSource = new MatTableDataSource<any>();

  patients: Patients[];
  patientsToDisplay: Patients[] = [];

  constructor(private fb: FormBuilder, private patientservice: PatientService ) {

    this.loadData();

    this.patientForm = fb.group({});
    this.patients = [];
    this.patientsToDisplay = this.patients;

    this.patient = {
      firstname: '',
      lastname: '',
      email:'',
      dob: '',
      gender: '',
      contact:''
    }
    this.patients = new Array<Patients>();


  }

  getFilteredData(filtervalue: string){
    filtervalue = filtervalue.trim();
    filtervalue = filtervalue.toLowerCase();
    this.dataSource.filter = filtervalue;
  }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.patientForm = this.fb.group({
      id:this.fb.control(''),
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      email: this.fb.control(''),
      dob: this.fb.control(''),
      gender: this.fb.control(''),
      contact: this.fb.control(''),

    });

    this.patientservice.getPatient().subscribe(res => {
      //console.log(res);
      for (let pat of res) {
        this.patients.unshift(pat);
      }
      this.patientsToDisplay = this.patients;
    });
  }

  public get Id(): FormControl {
    return this.patientForm.get('id') as FormControl;
  }
  public get FirstName(): FormControl {
    return this.patientForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.patientForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.patientForm.get('email') as FormControl;
  }
  public get Dob(): FormControl {
    return this.patientForm.get('dob') as FormControl;
  }
  public get Gender(): FormControl {
    return this.patientForm.get('gender') as FormControl;
  }
  public get Contact(): FormControl {
    return this.patientForm.get('contact') as FormControl;
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue(''),
    this.Dob.setValue('');
    this.Gender.setValue('');
    this.Contact.setValue('');
  }

  addPatient() {
    let patient: Patients = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      email: this.Email.value,
      dob: this.Dob.value,
      gender: this.Gender.value,
      contact: this.Contact.value,
    }
    this.patientservice.postPatient(patient).subscribe((res) => {
      this.patients.unshift(res);
      this.clearForm();
    });
  }

  editPatient(pat: Patients) : void
  {
    this.patientForm.controls['id'].setValue(pat.id);
    this.patientForm.controls["firstname"].setValue(pat.firstname),
    this.patientForm.controls["lastname"].setValue(pat.lastname),
    this.patientForm.controls["email"].setValue(pat.email),
    this.patientForm.controls["dob"].setValue(pat.dob),
    this.patientForm.controls["gender"].setValue(pat.gender),
    this.patientForm.controls["contact"].setValue(pat.contact)

    
  }

  updatePatient()
  {
    let patient: Patients = {
      id: this.Id.value,
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      email: this.Email.value,
      dob: this.Dob.value,
      gender: this.Gender.value,
      contact: this.Contact.value,
    }

    this.patientservice.editPatient(this.Id.value,patient).subscribe((res) => {
      //this.patients[this.patients.length-this.Id.value]=res;
      alert('record updated successfully');
      //this.clearForm();
    });
  }


  deletePatient(patients_id : any){
    //console.log(patients_id);
    this.patientservice.deletePatient(patients_id).subscribe((result)=> {
      alert('record deleted successfully');
      //this.ngOnInit();
    });
  }

  //data:any;
  loadData(){
    this.patientservice.getPatient().subscribe((result) => {
        this.dataSource.data = result ;
        console.log(this.patients);
        //        console.log("inside");
    });
  }
}

