import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
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
export let  picturedescriptionData = {
  photoURL: '',
  description:'',
  photoREF:''
}

@Component({
  selector: 'page-questionform',
  templateUrl: 'questionform.html'
})
export class QuestionformPage {

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
    this.http.request( this.url + '?mc=post_config.create&id=' + this.postConf.id + '&name=' + this.postConf.name ).subscribe( s=>{
      console.log( 'this :::: ()' + s )
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
    if( this.idx ){
      
      this.http.get( this.url + '?mc=post.get&idx=' + this.idx ).subscribe(res=>{

        if( JSON.parse(res['_body']).data.extra_1 == 'grammar' ){

          this.grammarPost.question = JSON.parse(res['_body']).data.title;
          this.grammarPost.choice1 = JSON.parse(res['_body']).data.extra_2;
          this.grammarPost.choice2 = JSON.parse(res['_body']).data.extra_3;
          this.grammarPost.choice3 = JSON.parse(res['_body']).data.extra_4;
          this.grammarPost.choice4 = JSON.parse(res['_body']).data.extra_5;
          this.grammarPost.answer = JSON.parse(res['_body']).data.extra_6;
          return;
        }else if ( JSON.parse(res['_body']).data.extra_1 == 'vocabulary' ){
          this.category = 'vocabulary';
          console.log('category:: ', this.category )
          return;
          }
          this.category = 'picture';
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
    }

  }

  checkIDX(){
    if( ! this.idx ){
      this.option = '?mc=post.write&post_id=questions' ;
      return;
    }else{
      this.option = '?mc=post.edit&idx='+ this.idx +'&post_id=questions';
    }
  }

  vocabularyQuestion(){
    
    if ( this.validateForm() == false ) {
      return;
    }
    this.checkIDX();
    this.errorChk = { progress: 'progress'};
    this.http.request(
      this.url
      + this.option
      + '&extra_1='
      + this.category
      + '&title='
      + this.vocabularyPost.word
      + '&extra_2='
      + this.vocabularyPost.choice1
      + '&extra_3='
      + this.vocabularyPost.choice2
      + '&extra_4='
      + this.vocabularyPost.choice3
      + '&extra_5='
      + this.vocabularyPost.choice4
      + '&extra_6='
      + this.vocabularyPost.answer
      )
      .subscribe( res=>{
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
      let file = event.target.files[0];
      if ( file === void 0 ) return;
      this.file_progress = true;
      let ref = 'photo/' + Date.now() + '/' + file.name;
      this.file.upload( { file: file, ref: ref }, uploaded => {
          this.onFileUploaded( uploaded.url, uploaded.ref );
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


  grammarQuestion(){
    if ( this.validateForm() == false ) {
      return;
    }
    this.checkIDX();
    this.errorChk = { progress: 'progress'};
    this.http.request( 
      this.url 
        + this.option
        + '&extra_1='
        + this.category
        + '&title=' 
        + this.grammarPost.question 
        + '&extra_2=' 
        + this.grammarPost.choice1 
        + '&extra_3=' 
        + this.grammarPost.choice2 
        + '&extra_4=' 
        + this.grammarPost.choice3
        + '&extra_5='
        + this.grammarPost.choice4
        + '&extra_6='
        + this.grammarPost.answer  
      )
      .subscribe( res=>{
      this.errorChk = { success: 'success' }
      console.log( 'successfully added: ' + res );
      if( !this.idx ) this.onClickReset();
    },e=>{
      console.log( 'error' + e )
    })
  }

  photoQuestion(){

    this.checkIDX();
    this.errorChk = { progress: 'processing' };
    this.http.request(
      this.url
        + this.option
        + '&extra_1='
        + this.category
        + '&title='
        + this.photo.description
        + '&content='
        + this.photo.photoURL
        + '&extra_7='
        + this.photo.photoREF
    ).subscribe( res=>{
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

    }
      this.photoQuestion();
    
  }

}
