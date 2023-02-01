import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommunityComponent } from './community/community.component';
import {CommunityModule} from "./community/community.module";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    CommunityModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
