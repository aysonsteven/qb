import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';

const XBASE_SESSION_ID = 'xbase-session-id';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  session_id = 'xbase-session-id';

  url:string = 'http://xbase.esy.es/index.php'

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  get requestOptions() : RequestOptions {
          let headers  = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options  = new RequestOptions({ headers: headers });   
          return options;
  }

  buildQuery( params : any ) {
      return this.http_build_query( params );
  }

  login( data : any, successCallback: (session_id:string) => void, errorCallback: (error:string) => void ) {
      data['mc'] = 'user.login';
      this.query( data, (session_id : any )=> {
          localStorage.setItem( XBASE_SESSION_ID , session_id );
          successCallback( session_id );
      }, errorCallback );
  }


  logged( yesCallback: ( session_id: string ) => void, noCallback?: () => void ) {
    let session_id = localStorage.getItem( XBASE_SESSION_ID );
    if ( session_id ) yesCallback( session_id );
    else noCallback();
  }


  query( data : any, successCallback : any, errorCallback  : any ) {
    let body = this.buildQuery( data );
    console.log("debug url: ", this.url  + '?' + body );
    this.http.post( this.url, body, this.requestOptions )
      .subscribe( data => {
          try {
              let re = JSON.parse( data['_body'] );
              if ( re['code'] ) return errorCallback( re['message'] );
              //console.log('query::sucess: ', data);
              successCallback( re['data'] );
          }
          catch( e ) {
              //console.log(data);
              errorCallback(data['_body']);
          }
      });
  }



  http_build_query (formdata : any, numericPrefix='', argSeparator='') { 
    var urlencode = this.urlencode;
    var value : any
    var key : any
    var tmp : any = []
    var _httpBuildQueryHelper = function (key : any, val : any, argSeparator : any) {
        var k : any
        var tmp : any = []
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


  urlencode (str : any) {
    str = (str + '')
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
  }

}
