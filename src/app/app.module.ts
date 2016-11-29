import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionformPage } from '../pages/questionform/questionform';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { QuestionslistPage } from '../pages/questionslist/questionslist';
import { ControlpanelPage } from '../pages/controlpanel/controlpanel';
import { QuestionComponent } from '../components/question/question';
import { FireModule } from '../fireframe2/fire-module';
import { UserService } from '../providers/user-service';
import { QuizService } from '../providers/quiz-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthenticationPage,
    QuestionformPage,
    QuestionslistPage,
    ControlpanelPage,
    QuestionComponent
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
    QuestionslistPage,
    ControlpanelPage,
    QuestionComponent

  ],
  providers: [ UserService, QuizService ]
})
export class AppModule {}
