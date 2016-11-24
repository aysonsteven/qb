import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ControlpanelPage } from '../controlpanel/controlpanel';
import { AuthenticationPage } from '../authentication/authentication'
import { User } from '../../fireframe2/user';

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
    public user: User
    ) {

    }

  ionViewDidLoad() {
      this.user.loggedIn( (userData) => {
        console.log('HomePage::constructor() user.loggedIn() : yes : userData : ', userData);
        this.navCtrl.setRoot( ControlpanelPage );
      }, e => this.navCtrl.setRoot( AuthenticationPage ) );
  }

}
