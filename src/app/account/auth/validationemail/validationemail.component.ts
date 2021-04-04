import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicee } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validationemail',
  templateUrl: './validationemail.component.html',
  styleUrls: ['./validationemail.component.scss']
})
export class ValidationemailComponent implements OnInit {
  codeForm: FormGroup
_id:any
  constructor( 
    private userService: AuthServicee,
       private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private actiVrouter: ActivatedRoute,



    ) { 
let formControls={
  code:new FormControl('',[
Validators.required,
Validators.minLength(3)

  ])
}
this.codeForm=this.fb.group(formControls)


    }
  ngOnInit(): void {
  this._id = this.actiVrouter.snapshot.paramMap.get('id');
  }
  resend(){

  this.userService.resendEmail(this._id).subscribe((res)=>{

  })  
      }
  sendcode(){
let data=this.codeForm.value;
if(this.codeForm.valid){
this.userService.verificationAcccount(this._id,data).subscribe((res)=>{
console.log(res);
if(res.verified==true){
this.router.navigate(['/login']);

}

})
}

  }

}
