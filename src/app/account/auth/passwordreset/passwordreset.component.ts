import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { AuthServicee } from 'src/app/services/auth.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {
  sentemail:FormGroup;
  ismail:any=true;
  constructor(    private gs: GlobalService,
    private fb: FormBuilder,
    private userService:AuthServicee,
    private actiVrouter: ActivatedRoute,



    ) { 

      let formControls = {
     

        email: new FormControl('',[
          Validators.required,
          Validators.email
        ])

    }
  
  this.sentemail=this.fb.group(formControls);
  }
  get email() { return this.sentemail.get('email') }

  ngOnInit(): void {
  }
  
 
sent(){    
  let email = this.sentemail.controls["email"].value;
this.userService.resetEmail(email).subscribe((res)=>{
this.ismail=res.isemail;
})

}
}
