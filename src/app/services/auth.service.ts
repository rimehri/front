import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../account/auth/login/login.component';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServicee {



  constructor(private http: HttpClient, private gs: GlobalService) {

  }

socialLog(data:any){
  return this.http.post<any>(`${this.gs.uri}/auth/socauth`, {
    nom:data.nom,
    email:data.email,
prenom:data.prenom,
image:data.image,
  });
}
  logging(email: any, password: any) {
    let hash = this.gs.hashPassword(password);
    return this.http.post<any>(`${this.gs.uri}/auth`, {
      email: email, password: hash
    });
  }
  resendEmail(id: any) {

    return this.http.get<any>(`${this.gs.uri}/users/${id}`);

  }
  downloadMedia(fileName  : any): Observable<Blob> {
    return this.http.get(
      ` ${this.gs.uri}/profile/download/` + fileName,
        {
            responseType: "blob",
        }
    );
}
  registerUser(data: any) {
    return this.http.post<any>(`${this.gs.uri}/users`, {
      nom: data.username,
      prenom: data.lastname,
      email: data.email,
      role: 'user',
      password: this.gs.hashPassword(data.password),
    });
  }
  resetEmail(email: any) {
    return this.http.post<any>(`${this.gs.uri}/auth/reset`, {
      email: email
    });

  }
  updateProfile(id:any,data:any){
    return this.http.patch<any>(`${this.gs.uri}/profile/${id}`, {
      nom:data.nom,
    email:data.email,
prenom:data.prenom,
password:data.password,
image:data.image,
     })
      
  }
  verificationAcccount(id: any, data: any) {
    return this.http.patch<any>(`${this.gs.uri}/users/${id}`, {
      code: data.code
    })
   


  }
  getAccount(id: any) {
    return this.http.get<any>(`${this.gs.uri}/profile/${id}`);

  }
  changePwd(pwd: any, id: any) {
    console.log(pwd, id);
    let hash = this.gs.hashPassword(pwd);
    return this.http.patch<any>(`${this.gs.uri}/users/${id}`, {
      password: hash
    })
  }
  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(
      'http://localhost:3000/profile/file',
      formData,
     
    );
  }





  // registerAdmin(user : User){
  //   return this.http.post<any>(this._registerUrl, user);
  // }
  // loginAdmin(user:User){
  //   return this.http.post<any>(this._loginUrl, user);
  //   console.warn("ok");
  // }

  // loginUser(user : User){
  //  return this.http.post<any>(this._loginUrl , user)
  //  console.warn("ok");
  // }

}
