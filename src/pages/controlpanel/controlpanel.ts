import { Component } from '@angular/core';
import { QuestionformPage } from '../questionform/questionform';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionslistPage } from '../questionslist/questionslist';
import { AuthenticationPage } from '../authentication/authentication';
// import { HomePage } from '../home/home';
import { User, USER_DATA } from '../../fireframe2/user';
import { UserService } from '../../providers/user-service';

interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}


@Component({
  selector: 'page-control',
  templateUrl: 'controlpanel.html'
})
export class ControlpanelPage {

  uid;
  userName;

  userData = <userMeta> {};

  constructor(
    private navCtrl: NavController,
    private user: User,
    private toastCtrl: ToastController,
    private userSrvc: UserService
    ) {
          this.checkUser();
  }
  ionViewWillEnter(){

  }
  checkUser(){
    this.userSrvc.logged(s=>{
      console.log('check session', s)
    }, ()=>{
      console.log('not logged in')
      this.navCtrl.setRoot( AuthenticationPage );
    })
    // this.user.loggedIn( ( userData ) => {
    //   this.uid = userData.uid;
    //   this.user.set( 'key', this.uid ).get( user =>{
    //   }, e=>{})
    // }, e => alert('Login : ' + e ) );
}

  goToQuestionForm(){
    this.navCtrl.setRoot( QuestionformPage );
  }

  goToQuestionList(){
    this.navCtrl.setRoot( QuestionslistPage );
  }
  onClickLogout(){
    this.userSrvc.logout( res=>{
      console.log('check logout', res);
      this.toastCtrl.create({
        message: 'Logged out',
        duration: 2500,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'x'
      }).present();
      this.navCtrl.setRoot( ControlpanelPage );
    },() =>{console.log('checklogout :: e')})
  //   this.user.logout( () => {
  //     this.userData = null
  //     this.navCtrl.setRoot( HomePage )
  // } );
  }

}
