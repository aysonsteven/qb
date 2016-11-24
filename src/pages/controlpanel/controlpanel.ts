import { Component } from '@angular/core';
import { QuestionformPage } from '../questionform/questionform';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionslistPage } from '../questionslist/questionslist';
import { HomePage } from '../home/home';
import { User, USER_DATA } from '../../fireframe2/user';

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
    private toastCtrl: ToastController
    ) {
      this.checkUser();
  }
  checkUser(){
    this.user.loggedIn( ( userData ) => {
      this.uid = userData.uid;
      this.user.set( 'key', this.uid ).get( user =>{
      }, e=>{})
    }, e => alert('Login : ' + e ) );
}

  goToQuestionForm(){
    this.navCtrl.setRoot( QuestionformPage );
  }

  goToQuestionList(){
    this.navCtrl.setRoot( QuestionslistPage );
  }
  onClickLogout(){
    this.user.logout( () => {
      this.userData = null
      this.navCtrl.setRoot( HomePage )
  } );
  }

}
