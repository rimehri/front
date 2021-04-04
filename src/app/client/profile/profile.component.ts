import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { AuthServicee } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:any;
_id:any;
registerForm: FormGroup;

  constructor(private router: Router, private userService:AuthServicee,
    
    private gs: GlobalService,
    private actiVrouter: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
    ) {
      this.user=this.gs.getUser();

      console.log("formcontrol",this.user)
      let formControls = {
        
        nom: new FormControl(this.user.nom,[
          Validators.required,
        ]),
        prenom: new FormControl(this.user.prenom,[
          Validators.required,
          Validators.minLength(2)
        ]),
        email: new FormControl(this.user.email,[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6)
        ]),
        confirm: new FormControl('',[
          Validators.required,
          Validators.minLength(6)
        ]),
        curentpwd: new FormControl('',[
          Validators.required,
          Validators.minLength(6)
        ]),
      
      }
  
      this.registerForm = this.fb.group(formControls)
    
     }

  ngOnInit(): void {
    this.user=this.gs.getUser();
    console.log(this.user);
    if(this.user.image){
      this.userService
      .downloadMedia(this.user.image)
      .subscribe((blob) => {
          var myFile = blobToFile(blob, "my-image1.png");
          this.files.push(myFile)
          const objectURL = URL.createObjectURL(blob);
          const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
          this.user.image = objectURL
      })
}
    }
    getSafeUrl() {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.image);     
}

  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  logOut(){
    console.log("hello world")
    this.gs.logOut()
    this.router.navigate(['']);

  }
  profile(){
    this.router.navigate(['/profile']);

  }

login(){
  if(this.files.length>0){
    this.userService.postFile(this.files[0]).subscribe(resu=>{
      console.log(resu)
      let id=this.user._id;
      let  curentpwd=this.registerForm.controls["curentpwd"].value
      let password= this.registerForm.controls["password"].value
      let confirm=this.registerForm.controls["confirm"].value
      if(password!=''&&password!=null){
      curentpwd=this.gs.hashPassword(curentpwd);
     }
       let data={
        image : resu.img,
     email:this.registerForm.controls["email"].value,
      password: this.gs.hashPassword(this.registerForm.controls["password"].value),
      nom:this.registerForm.controls["nom"].value,
      prenom:this.registerForm.controls["prenom"].value,
       }
     this.userService
     this.userService.updateProfile(id,data).subscribe((res)=>{
       console.log('id',res);
     
     this.user=res;
     this.ngOnInit();
     })
    })
  }else{
    let id=this.user._id;
    let  curentpwd=this.registerForm.controls["curentpwd"].value
    let password= this.registerForm.controls["password"].value
    let confirm=this.registerForm.controls["confirm"].value
    if(password!=''&&password!=null){
    curentpwd=this.gs.hashPassword(curentpwd);
   }
     let data={
   email:this.registerForm.controls["email"].value,
    password: this.gs.hashPassword(this.registerForm.controls["password"].value),
    nom:this.registerForm.controls["nom"].value,
    prenom:this.registerForm.controls["prenom"].value,
     }
   this.userService
   this.userService.updateProfile(id,data).subscribe((res)=>{
     console.log('id',res);
   
   this.user=res;
   
   })
  }


}
}


function blobToFile(theBlob: Blob, fileName: string) {
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return <File>theBlob;
}