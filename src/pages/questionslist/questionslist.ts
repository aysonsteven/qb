import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform'
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';


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
  url:string = 'http://xbase.esy.es/';
  questions = [];
  constructor(private navCtrl: NavController, private http: Http, private tstCtrl: ToastController) {
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
    this.http.post( this.url , this.http_build_query(this.opt), this.options ).subscribe(res=>{
      this.questions = JSON.parse(res['_body']).data.rows
      console.log( JSON.parse(res['_body']).data.rows )
      this.loading = false;
    }, e=>{})
  }


  http_build_query (formdata, numericPrefix='', argSeparator='') {
        var urlencode = this.urlencode;
        var value
        var key
        var tmp = []
        var _httpBuildQueryHelper = function (key, val, argSeparator) {
            var k
            var tmp = []
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

  urlencode (str) {
    str = (str + '')
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+')
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
    this.http.get( this.url + '?mc=post.delete&idx=' + id).subscribe( s=>{
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
