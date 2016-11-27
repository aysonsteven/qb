import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ControlpanelPage } from '../controlpanel/controlpanel';
import { AuthenticationPage } from '../authentication/authentication'
import { User } from '../../fireframe2/user';
import { UserService } from '../../providers/user-service';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public user: User,
    private userSrvc: UserService
    ) {
      this.checkuserlogged();
    }

  ionViewDidLoad() {
      this.user.loggedIn( (userData) => {
        console.log('HomePage::constructor() user.loggedIn() : yes : userData : ', userData);
        this.navCtrl.setRoot( ControlpanelPage );
      }, e => this.navCtrl.setRoot( AuthenticationPage ) );
  }

  checkuserlogged(){
    this.userSrvc.logged(s=>{
      console.log('check session', s)
    }, ()=>{
      console.log('not logged in')
    })
  }

}
