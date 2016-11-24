import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ControlpanelPage } from '../controlpanel/controlpanel';
import { User, USER_DATA } from "../../fireframe2/user";

interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  errorChk;

  userData = <userMeta> {};
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  authentication: string = 'login';

  constructor(
    public navCtrl: NavController,
    private user: User,
    private toastCtrl: ToastController
  ) {
    
  }


// observable
//  checks anfularfire auth if user is logged in.
  checkUser() {
    this.user.loggedIn( ( userData ) => {
      this.navCtrl.setRoot( ControlpanelPage );
    }, e => console.error( e ) );
  }

  onClickReset(){
    if( this.authentication == 'login' ){
      this.loginUserMail = undefined;
      this.loginUserPass = undefined;
      this.errorChk = {};
      return
    }
    this.userData.email = undefined;
    this.userData.password = undefined;
    this.userData.displayName = undefined;
    this.errorChk = {};
  }
  ionViewWillEnter(){
    // this.checkUser();
  }
  ionViewDidLoad(){
   
  }
  onClickLogin(){
    if ( this.validateForm() == false ) return;
    this.errorChk = { progress: 'Signing in .. ' };
    this.user
      .set( 'email', this.loginUserMail )
      .set( 'password', this.loginUserPass )
      .login( re => {
        this.errorChk = { success: 'Sign in sucess: redirecting to controlpanel ..'}
        this.navCtrl.setRoot( ControlpanelPage );
        this.toastCtrl.create( { 
          message:'sucess', 
          duration: 2500,
          showCloseButton: true,
          closeButtonText: 'x',
          position: 'top' 
        } ).present();
      }, e => {
        this.errorChk = { error: e }
        
        this.toastCtrl.create({
          message: e,
          showCloseButton: true,
          closeButtonText: 'x',
          position: 'top',
          duration: 2500
        })
        .present();
      });
  }
  onClickRegister(){
    if ( this.validateForm() == false ) return;
    this.errorChk = { progress: 'Registration on progress: please wait..' };
    this.user
     .sets(this.userData)
     .register(
        ( ) => {this.alert( 'User registration success' )
      this.errorChk = { success: 'Registration success' }
      this.navCtrl.setRoot( ControlpanelPage );
    },
        (e) => {
          
          this.errorChk = { error: e }
          this.toastCtrl.create( { message: e , duration: 1500 } ).present();
      } );
        
  }
  alert(e) {
    this.errorChk = { error: e }
    this.toastCtrl.create({ 
      message: e, 
      duration: 2500,
      showCloseButton: true,
      closeButtonText: 'x',
      position: 'top' 
    }).present();
  }

    validateForm() {
    if ( this.loginUserMail == '' || this.userData.email =='' ) {
      this.errorChk = { error: 'Input user email' };
      return false;
    }else if( this.loginUserPass == '' || this.userData.password == '' ){
      this.errorChk = { error: 'Input Password' }
      return false;
    }
    return true;
  }

  clearError(){
    this.errorChk = {};
  }
}
