import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform'
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import * as config from '../shared/shared.config.ts';

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

  pic:string;

  more = [];
  
  url:string = 'http://xbase.esy.es/';
  questions = [];
  constructor(private navCtrl: NavController, private http: Http, private tstCtrl: ToastController) {
    console.log('checkConfig:: ' + config.serverURL)
    this.getQuestionList();
  }

  ionViewDidLoad() {
    console.log('Hello QuestionslistPage Page');
  }

  getQuestionList(){
    this.http.request( this.url + '?mc=post.search' ).subscribe(res=>{
      this.questions = JSON.parse(res['_body']).data.rows
      console.log( JSON.parse(res['_body']).data.rows )
    }, e=>{})
  }

  moretest(x){
    console.log(x);
  }

  onSlideItem(id){
    // console.log('Slide ok')
    this.more[id] = null;
  }

  onClickBack(){
    this.navCtrl.setRoot( HomePage )
  }

  createToast(msg:string, time:number){
    this.tstCtrl.create({
      message:msg,
      duration: time
    }).present();
  }

  onClickDelete(id, index){
    this.http.request( this.url + '?mc=post.delete&idx=' + id).subscribe( s=>{
      console.log('ok: ' + s);
      this.createToast('Successfully deleted', 2500);
      this.questions.splice(index, 1);
    })
  }

  onClickUpdate(idx){
    this.navCtrl.setRoot( QuestionformPage, {
      id: idx
    } )
  }

}
