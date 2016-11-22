import { Component } from '@angular/core';
import { QuestionformPage } from '../questionform/questionform';
import { NavController } from 'ionic-angular';
import { QuestionslistPage } from '../questionslist/questionslist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController) {
    
  }

  goToQuestionForm(){
    this.navCtrl.setRoot( QuestionformPage );
  }

  goToQuestionList(){
    this.navCtrl.setRoot( QuestionslistPage );
  }

}
