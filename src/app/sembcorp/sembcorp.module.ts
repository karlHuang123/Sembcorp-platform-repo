import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '../../../projects/ngx-leaflet/src/lib/leaflet.module';

import { SembcorpComponent } from './sembcorp.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DailySectionComponent } from './components/daily-section/daily-section.component';
import { ModalComponent } from './components/modal/modal.component';
import { ChartGroupComponent } from './components/chart-group/chart-group.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		DailySectionComponent,
		LeafletModule,
		ChartGroupComponent
	],
	declarations: [
		SembcorpComponent,
		SearchBarComponent,
		ModalComponent
	],
	exports: [
		SembcorpComponent
	],
	bootstrap: [ SembcorpComponent ],
	providers: [ ]
})
export class SembcorpModule { }
