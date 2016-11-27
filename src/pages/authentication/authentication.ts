import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ControlpanelPage } from '../controlpanel/controlpanel';
import { User, USER_DATA } from "../../fireframe2/user";
import { Headers, Http, RequestOptions } from '@angular/http';
import { UserService } from '../../providers/user-service';


interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

interface form{
  id:string;
  password:string
}

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  body = {};

  headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'})
  options = new RequestOptions({headers : this.headers});
  url:string = 'http://xbase.esy.es/index.php'
  errorChk={};

  userData = <userMeta> {};
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  loginfrm: form = <form>{};

  authentication: string = 'login';

  constructor(
    public navCtrl: NavController,
    private user: User,
    private toastCtrl: ToastController,
    private http: Http,
    private userSrvc: UserService
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

  // onClickLogin(){
  //   this.body = {
  //     'mc': 'user.login',
  //     'id': this.loginUserMail,
  //     'password': this.loginUserPass
  //   }
  //   if ( this.validateForm() == false ) return;
  //   this.errorChk = { progress: 'Signing in .. ' };
  //   this.http.post( this.url, this.http_build_query(this.body), this.options )
  //     .subscribe( s =>{
  //       this.navCtrl.setRoot( ControlpanelPage );
  //       this.errorChk = { success: 'Logged in'}
  //       this.toastCtrl.create({
  //         message: 'success',
  //         duration: 2500,
  //         showCloseButton: true,
  //         closeButtonText: 'x',
  //         position: 'top'
  //       }).present();
  //     }, e=>{
  //       this.errorChk = { error: e }
  //       console.log(e)
  //     })
  // }



onClickLogin(){
  if( this.validateForm() ==false ) return;
  this.errorChk = { progress: 'Signing in..' };
  this.userSrvc.login( this.loginfrm , res =>{
    console.log('check response', res )
    this.errorChk = { success: 'success' };
    this.navCtrl.setRoot( ControlpanelPage );

  }, e=>{
    console.log('check error response', e );
    this.errorChk = { error: e }; 
  } )
}


  // onClickLogin(){
  //   if ( this.validateForm() == false ) return;
  //   this.errorChk = { progress: 'Signing in .. ' };
  //   this.user
  //     .set( 'email', this.loginUserMail )
  //     .set( 'password', this.loginUserPass )
  //     .login( re => {
  //       this.errorChk = { success: 'Sign in sucess: redirecting to controlpanel ..'}
  //       this.navCtrl.setRoot( ControlpanelPage );
  //       this.toastCtrl.create( { 
  //         message:'sucess', 
  //         duration: 2500,
  //         showCloseButton: true,
  //         closeButtonText: 'x',
  //         position: 'top' 
  //       } ).present();
  //     }, e => {
  //       this.errorChk = { error: e }
        
  //       this.toastCtrl.create({
  //         message: e,
  //         showCloseButton: true,
  //         closeButtonText: 'x',
  //         position: 'top',
  //         duration: 2500
  //       })
  //       .present();
  //     });
  // }
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

    http_build_query (formdata : any, numericPrefix='', argSeparator='') { 
            var urlencode = this.urlencode;
            var value : any
            var key : any
            var tmp : any = []
            var _httpBuildQueryHelper = function (key : any, val : any, argSeparator : any) {
                var k : any
                var tmp : any = []
                if (val === true) {
                val = '1'
                } else if (val === false) {
                val = '0'
                }
                if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                    if (val[k] !== null) {
                        tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
                    }
                    }
                    return tmp.join(argSeparator)
                } else if (typeof val !== 'function') {
                    return urlencode(key) + '=' + urlencode(val)
                } else {
                    throw new Error('There was an error processing for http_build_query().')
                }
                } else {
                return ''
                }
            }

            if (!argSeparator) {
                argSeparator = '&'
            }
            for (key in formdata) {
                value = formdata[key]
                if (numericPrefix && !isNaN(key)) {
                key = String(numericPrefix) + key
                }
                var query = _httpBuildQueryHelper(key, value, argSeparator)
                if (query !== '') {
                tmp.push(query)
                }
            }

            return tmp.join(argSeparator)
        }


        urlencode (str : any) {
            str = (str + '')
            return encodeURIComponent(str)
                .replace(/!/g, '%21')
                .replace(/'/g, '%27')
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\*/g, '%2A')
                .replace(/%20/g, '+')
        }
}
