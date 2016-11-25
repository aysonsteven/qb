import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


/*
  Generated class for the Question component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'question',
  templateUrl: 'question.html'
})
export class QuestionComponent {

  loading:boolean = false;
  category:string = 'grammar';
  opt={};
  questions = [];
  url:string = 'http://xbase.esy.es/';
  more = [];
  headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'})
  options = new RequestOptions({headers : this.headers});

  constructor(private http: Http) {
    console.log('Hello Question Component');
    this.getQuestionList();
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

}
