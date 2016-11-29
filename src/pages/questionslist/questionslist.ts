import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform'
import { Http, Headers, RequestOptions } from '@angular/http';
import { QuizService } from '../../providers/quiz-service';


/*
  Generated class for the Questionslist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questionslist',
  templateUrl: 'questionslist.html'
})

export class QuestionslistPage {


  loading:boolean = false;
  category:string = 'grammar';
  opt={};

  pic:string;

  more = [];
  headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'})
  options = new RequestOptions({headers : this.headers});
  url:string = 'http://xbase.esy.es/index.php';
  questions = [];
  constructor(
    private navCtrl: NavController, 
    private http: Http, 
    private tstCtrl: ToastController, 
    private quizSrvc: QuizService,
    ) {
    this.loading = true;
    this.getQuestionList();
  }

  ionViewDidLoad() {
    console.log('Hello QuestionslistPage Page');
  }
  testChange(){
    this.questions = [];
    this.loading = true;
    console.log(this.category);
    this.getQuestionList();
  }

  getQuestionList(){
    this.opt={
      'mc' : 'post.search',
      'options': {
        'cond' : "extra_1 = '" + this.category +"'",
        'orderby':'idx DESC'
      }
  };
    this.quizSrvc.query( this.opt, res=>{
      this.questions = JSON.parse(res['_body']).data.rows
      console.log( JSON.parse(res['_body']).data.rows )
      this.loading = false;
    }, e=>{})
  }

  onClickUpdate(idx){
    this.navCtrl.setRoot( QuestionformPage, {
      id: idx
    } )
  }

}
