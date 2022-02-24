import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';

import { ProductsModule } from '@bluebites/products';
import {UiModule} from '@bluebites/ui';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@bluebites/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesComponent } from './shared/messages/messages.component';

const routes = [
  {path: '', component: HomePageComponent}
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent,HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [
    MessagesComponent
  ],
})
export class AppModule {}
