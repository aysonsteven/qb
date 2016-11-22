import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionformPage } from '../pages/questionform/questionform';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { QuestionslistPage } from '../pages/questionslist/questionslist';
import { FireModule } from '../fireframe2/fire-module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthenticationPage,
    QuestionformPage,
    QuestionslistPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FireModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthenticationPage,
    QuestionformPage,
    QuestionslistPage
  ],
  providers: []
})
export class AppModule {}
