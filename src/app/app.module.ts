import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AnswersComponent } from './answers/answers.component';
import { CalculationService } from './answers/calculation.service';

@NgModule({
  declarations: [
    AppComponent,
    AnswersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
