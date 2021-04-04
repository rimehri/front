import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/global.service';
import { AuthServicee } from 'src/app/services/auth.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-chngpwd',
  templateUrl: './chngpwd.component.html',
  styleUrls: ['./chngpwd.component.scss']
})
export class ChngpwdComponent implements OnInit {
  isconfirm:boolean=false;
  registerForm: FormGroup
  error = "";
  errorTimer:any;
  _id:any;

  constructor(
    private gs: GlobalService,
    private fb: FormBuilder,
    private userService:AuthServicee,
    private router:Router,
    private toastr: ToastrService,
    private actiVrouter: ActivatedRoute,

    ) {

    let formControls = {
     

      confpassword: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
    
    }

    this.registerForm = this.fb.group(formControls)
  }


  get confpassword() { return this.registerForm.get('confpassword') }
  get password() { return this.registerForm.get('password') }


  ngOnInit(): void {
 
  }

   setErrorTimer() {
    clearTimeout(this.errorTimer);
        this.errorTimer = setTimeout(() => {
     this.error = "";
     }, 5000);
   }
   login() {
   this._id = this.actiVrouter.snapshot.paramMap.get('id');

     let confpassword = this.registerForm.controls["confpassword"].value;
     let password = this.registerForm.controls["password"].value;
     if(confpassword!=password){
 this.isconfirm=true
     }
    this.userService.changePwd(password,this._id).subscribe((res)=>{
 if(!this.isconfirm){
    this.router.navigate(['/login']);

   }
    })
      


   }

}
