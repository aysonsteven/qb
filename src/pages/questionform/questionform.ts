import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { QuizService } from '../../providers/quiz-service';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Data } from '../../fireframe2/data';

/*
  Generated class for the Questionform page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

let grammarData = {
  question: '',
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
  answer: ''

}

let vocabularyData = {
    word: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    answer: ''
}
let  picturedescriptionData = {
  photoURL: '',
  description:'',
  photoREF:'',
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
  answer: ''
}

@Component({
  selector: 'page-questionform',
  templateUrl: 'questionform.html'
})
export class QuestionformPage {

  body = {};

  headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'})
  options = new RequestOptions({headers : this.headers});

  postConf = {
    id:'questions',
    name:'questions for quiz app'
  }
  position = 0;
  urlPhoto;
  file_progress = null;

  idx:number;
  errorChk;
  option:string;


  url:string = 'http://xbase.esy.es/';
  grammarPost = grammarData;
  vocabularyPost = vocabularyData;

  photo = picturedescriptionData;


  category: string = 'grammar';
  constructor(
    private navCtrl: NavController,
    private http: Http,
    private navPar: NavParams,
    private quizSrvc: QuizService,
    private file: Data
    ) {
      this.idx = parseInt(this.navPar.get('id'));
      console.log('this is idx: ' + this.idx + ' : '+  typeof(this.idx))
      this.getQuestion();
      if(this.idx){

      }else{

      }
      this.createPostConfig();
      this.onClickReset();
    }

  ionViewDidLoad() {
    console.log('Hello QuestionformPage Page');

  }


  removeWhiteSpaces( val ){
    console.log('test:: ' , val)
    return val.split(' ').join('')
  }

  createPostConfig(){
    this.body = {
      'mc': 'post_config.create',
      'id': this.postConf.id,
      'name': this.postConf.name
    }
    this.quizSrvc.query( this.body , res=>{
      console.log('created', res)
    }, e=>{
      console.log( e );
    })
  }

  onClickBack(){
    this.navCtrl.setRoot( HomePage );
  }


  onClickReset(){
    this.grammarPost.question = '';
    this.grammarPost.choice1 = '';
    this.grammarPost.choice2 = '';
    this.grammarPost.choice3 = '';
    this.grammarPost.choice4 = '';
  }

  getQuestion(){
    this.body = {
      'mc': 'post.get',
      'idx': this.idx
    }
    if( this.idx ){

      this.quizSrvc.query( this.body,  res=>{
      let data = JSON.parse( res['_body']).data;
        if( JSON.parse(res['_body']).data.extra_1 == 'grammar' ){

          this.grammarPost.question = data.title;
          this.grammarPost.choice1 = data.extra_2;
          this.grammarPost.choice2 = data.extra_3;
          this.grammarPost.choice3 = data.extra_4;
          this.grammarPost.choice4 = data.extra_5;
          this.grammarPost.answer = data.extra_6;
          return;
        }else if ( JSON.parse(res['_body']).data.extra_1 == 'vocabulary' ){
          this.category = 'vocabulary'
          this.vocabularyPost.word = data.title;
          this.vocabularyPost.choice1 = data.extra_2;
          this.vocabularyPost.choice2 = data.extra_3;
          this.vocabularyPost.choice3 = data.extra_4;
          this.vocabularyPost.choice4 = data.extra_5;
          this.vocabularyPost.answer = data.extra_6;
          console.log('category:: ', this.category )
          return;
          }
          this.category = 'picture';
          this.photo.description = data.title;
          this.urlPhoto = data.content;
          this.photo.photoURL = data.content;
          this.photo.choice1 = data.extra_2;
          this.photo.choice2 = data.extra_3;
          this.photo.choice3 = data.extra_4;
          this.photo.choice4 = data.extra_5;
          this.photo.answer = data.extra_6
          console.log( 'category:: ', this.category );
        console.log('check getEditData: ' , JSON.parse(res['_body']).data)
      }, e=>{ console.log('error ' , e )})
    }
  }



  validateForm(){
    if( this.category == 'grammar'){
      if( this.grammarPost.question == ''){
        this.errorChk = { error: 'error' }
        return false;
      }
    }else if( this.category == 'vocabulary'){
      if( this.vocabularyPost.word == ''){
        this.errorChk = { error: 'error' }
        return false;
      }
      if( this.photo.description == ''){
        this.errorChk = { error: 'error'}
        return false;
      }
    }
  }

  checkIDX(){
    if( ! this.idx ){
      this.option = '?mc=post.write' ;
      return;
    }else{
      this.option = '?mc=post.edit&idx='+ this.idx +'&post_id=questions';
    }
  }





  checkCreateUpdateVoca(){
    if( ! this.idx ){
      this.body ={
        'mc': 'post.write',
        'post_id': 'questions',
        'extra_1': this.category,
        'title': this.vocabularyPost.word,
        'extra_2': this.vocabularyPost.choice1,
        'extra_3': this.vocabularyPost.choice2,
        'extra_4': this.vocabularyPost.choice3,
        'extra_5': this.vocabularyPost.choice4,
        'extra_6': this.vocabularyPost.answer
      }
      return;
    }
      this.body ={
        'mc': 'post.edit',
        'idx': this.idx,
        'post_id': 'questions',
        'extra_1': this.category,
        'title': this.vocabularyPost.word,
        'extra_2': this.vocabularyPost.choice1,
        'extra_3': this.vocabularyPost.choice2,
        'extra_4': this.vocabularyPost.choice3,
        'extra_5': this.vocabularyPost.choice4,
        'extra_6': this.vocabularyPost.answer
      
    }  
  }

  vocabularyQuestion(){
    this.checkCreateUpdateVoca();
    this.errorChk = { progress: 'progress'};
    this.quizSrvc.post( this.body, res=>{
      this.errorChk = { success: 'success' }
      console.log( 'successfully added: ' + res );
      if( !this.idx ) this.onClickReset();
    },e=>{
      console.log( 'error' + e )
    })
  }


  onFileUploaded( url, ref ) {
    this.file_progress = false;
    this.urlPhoto = url;
    this.photo.photoURL = url;
    this.photo.photoREF = ref;
}
  onChangeFile(event) {
  // let reader = new FileReader()
    let file = event.target.files[0];
    if ( file === void 0 ) return;
    this.file_progress = true;
    let ref = 'photo/' + Date.now() + '/' + file.name;
    this.file.upload( { file: file, ref: ref }, uploaded => {
        this.onFileUploaded( uploaded.url, uploaded.ref );
      console.log('this is the photo' , this.urlPhoto)
    },
    e => {
        this.file_progress = false;
        alert(e);
    },
    percent => {
        this.position = percent;
    } );
  }
  onClickDeletePhoto( ref ) {
      this.file.delete( ref, () => {
          this.urlPhoto = null;
          this.photo.photoURL = null;
          this.photo.photoREF = null;
      }, e => {
          alert("FILE DELETE ERROR: " + e);
      } );
  }

  checkGrammarQuestion(){
    if( ! this.idx ){
      this.body ={
        'mc': 'post.write',
        'post_id': 'questions',
        'extra_1': this.category,
        'title': this.grammarPost.question,
        'extra_2': this.grammarPost.choice1,
        'extra_3': this.grammarPost.choice2,
        'extra_4': this.grammarPost.choice3,
        'extra_5': this.grammarPost.choice4,
        'extra_6': this.grammarPost.answer
      }
      return;
    }
      this.body ={
        'mc': 'post.edit',
        'idx': this.idx,
        'post_id': 'questions',
        'extra_1': this.category,
        'title': this.grammarPost.question,
        'extra_2': this.grammarPost.choice1,
        'extra_3': this.grammarPost.choice2,
        'extra_4': this.grammarPost.choice3,
        'extra_5': this.grammarPost.choice4,
        'extra_6': this.grammarPost.answer
      
    }  
  }
  grammarQuestion(){
    if ( this.validateForm() == false ) {
      return;
    }
    this.checkGrammarQuestion();
    this.errorChk = { progress: 'progress'};
    this.quizSrvc.post( this.url , res=>{
      this.errorChk = { success: 'success' }
      console.log( 'successfully added: ' + res );
      if( !this.idx ) this.onClickReset();
    },e=>{
      console.log( 'error' + e )
    })
  }

  photoQuestion(){

    this.body = {
      'mc': 'post.write',
      'post_id': 'questions',
      'extra_1': this.category,
      'extra_2': this.photo.choice1,
      'extra_3': this.photo.choice2,
      'extra_4': this.photo.choice3,
      'extra_5': this.photo.choice4,
      'extra_6': this.photo.answer,
      'title': this.photo.description,
      'content': this.urlPhoto,
      'extra_7': this.photo.photoREF
    }


    this.checkIDX();
    this.errorChk = { progress: 'processing' };
    console.log('check urlPhoto ' , this.urlPhoto)
    this.quizSrvc.post( this.body, res=>{
      this.errorChk = { success: 'successfully uploaded' }
      console.log( 'check state: -' + res )
      if( !this.idx ) this.onClickReset();
    }, e=>{
      console.error( 'error', e )
    })

    // console.log('pic ' + this.grammarPost )

  }

  onClickCreateQuestion(){
    if( this.category == 'grammar'){
      this.grammarQuestion();

      return;
    }else if( this.category == 'vocabulary' ){
      this.vocabularyQuestion();
      return;

    }else if( this.category == 'vocabulary' ){
      this.vocabularyQuestion();
    }else{
      this.photoQuestion();
      console.log('check this url' , this.urlPhoto )

    }
      this.photoQuestion();

  }

}
