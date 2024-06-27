import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SembcorpModule } from './sembcorp/sembcorp.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SembcorpModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
