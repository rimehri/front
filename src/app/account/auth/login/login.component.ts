import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../entities/user';
import { AuthServicee } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalService } from './../../../global.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup
  error = "";
  errorTimer:any;
  user: any;
  loggedIn: boolean=false;


  constructor(
    private authService: SocialAuthService,
    private gs: GlobalService,
    private fb: FormBuilder,
    private userService:AuthServicee,
    private router:Router,
    private toastr: ToastrService,
    ) {

    let formControls = {


      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),

    }

    this.registerForm = this.fb.group(formControls)
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      let data={
        nom:this.user.firstName,
        prenom:this.user.lastName,
        email:this.user.email,
        image:this.user.photoUrl
      }
      this.userService.socialLog(data).subscribe((res)=>{
        if (res.token && res.user) {
      console.log("2")

          this.gs.saveToken(res.token);
          this.gs.setUser(res.user);
          this.router.navigate(["/home"]);
       }
       })
    });

  }

  signInWithFB(): void {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      let data={
        nom:this.user.firstName,
        prenom:this.user.lastName,
        email:this.user.email,
        image:this.user.photoUrl
      }
      this.userService.socialLog(data).subscribe((res)=>{
        if (res.token && res.user) {
      console.log("2")

          this.gs.saveToken(res.token);
          this.gs.setUser(res.user);
          this.router.navigate(["/home"]);
       }
       })
    });



  }

  signOut(): void {
    this.authService.signOut();
  }
  get email() { return this.registerForm.get('email') }
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
    let email = this.registerForm.controls["email"].value;
    let password = this.registerForm.controls["password"].value;
    this.userService.logging(email, password).subscribe(
      (res) => {
        console.log("hne",res.user.verified)
        if(res.user.verified){
        console.log(res);
        if (res.error) {
          this.error =
            "il y a un problème sur le serveur lors de la tentative de connexion";
          this.setErrorTimer();
        } else if (res.token && res.user) {
          this.gs.saveToken(res.token);
          this.gs.setUser(res.user);
          if(res.user.role=='user'){
          this.router.navigate(["/home"]);
        }else if(res.user.role=='admin'){
          this.router.navigate(["/admin"]);

        }else{
          this.router.navigate(["/admin"]);

        }
        }}
        else{
          this.router.navigate(['/code-verification/'+res.user._id]);
        }
      },
      (err: any) => {
        if (err.status === 401) {
          this.error = "utilisateur ou mot de passe est incorect";
          this.setErrorTimer();
        }
      }
    );



  }



}

