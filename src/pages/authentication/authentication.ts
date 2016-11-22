import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http'
import { HomePage } from '../home/home';
<<<<<<< HEAD
=======
import * as config from '../shared/shared.config.ts';
>>>>>>> 552a2c68cdb53416857d81ceabd5f31372f32db8

interface userMeta {
  id:string;
  idx:number;
  email: string;
  password?: string;
  uid?: string;
  displayName:string;
  age:string;
}

/*
  Generated class for the Authentication page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  userData = <userMeta> {};
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  authentication: string = 'login';
  errorChk;
  users= [];
  url:string = 'http://xbase.esy.es/';

  constructor(private navCtrl: NavController, private http: Http) {
    this.test();
    this.navCtrl.setRoot( HomePage );
  }

  ionViewDidLoad() {
    console.log('Hello AuthenticationPage Page');
  }

  test(){
    this.http.request( this.url + '?mc=user.fetch').subscribe(res=>{
      this.users = JSON.parse(res['_body']).data
      console.log(this.users);
    })
  }
  validateForm() {

  if ( this.loginUserMail == '' || this.userData.email == null ) {
    this.errorChk = { error: 'Input user email' };
    return false;
  }else if( this.loginUserPass == '' || this.userData.password == null ){
    this.errorChk = { error: 'Input Password' }
    return false;
  }
  return true;
}


  onClickLogin(){
    this.errorChk = { progress: 'Login Progress ...' };
    this.http.get( this.url + '?mc=user.login&id=' + this.loginUserMail + '&password='+ this.loginUserPass ).subscribe( res =>{
      console.log('result' + res);
      this.errorChk = { success: 'login success' }
      this.navCtrl.setRoot( HomePage );
    })
  }
  

  onClickRegister(){
  if ( this.validateForm() == false ) return;
  this.errorChk = { progress: 'Registration on progress: please wait..' };
  this.http.get( this.url + '?mc=user.register&id=' + this.userData.id + '&email=' + this.userData.email+ '&password='+ this.userData.password ).subscribe( re=>{
    console.log('ok : ' + re )
    this.onClickReset();
    this.errorChk = { success: 'Registration success.' };
  }, e=>{
    console.log('error' + e)
  })
}

  onClickReset(){
    this.userData.displayName = '';
    this.userData.email = '';
    this.userData.id = '';
    this.userData.password = '';
  }

  onClickForgotPass(){

  }
}
