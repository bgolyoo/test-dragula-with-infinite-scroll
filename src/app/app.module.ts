import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    InfiniteScrollModule,
    DragulaModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
