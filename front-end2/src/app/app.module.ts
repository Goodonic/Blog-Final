import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FlashMessagesModule} from "flash-messages-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import {RegService} from "./reg.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import { QuillModule } from 'ngx-quill';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    PostPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    QuillModule.forRoot(),
  ],
  providers: [RegService, AuthService,  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
