import { Component, Input, ChangeDetectorRef, SimpleChanges   } from '@angular/core';
import { latLng, marker, Marker, tileLayer, Map, icon } from 'leaflet';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  @Input() currentLocation: any;
  constructor(private cdr: ChangeDetectorRef) {}
  map: Map;
  markers: Marker[] = [];
  latLng: any = null;
  showMap: boolean = false;

  LAYER_OSM = tileLayer('https://maps3.shipdt.com/vt?lyrs=y&h1=zh-CN&gl=CN&x={x}&y={y}&z={z}', { maxZoom: 28, attribution: 'Open Street Map' });

	// Values to bind to Leaflet Directive
	options = {
		layers: [ this.LAYER_OSM ],
		zoom: 18,
		center: latLng(1.327,  103.826)
	};

  onMapReady(map: Map) {
		this.map = map;
	}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation']) {
      this.showMap = false
      this.options.center = latLng(this.currentLocation.latLng.lat, this.currentLocation.latLng.lng)
      setTimeout(() => {
        this.showMap = true
      }, 0)
    }
  }
}
