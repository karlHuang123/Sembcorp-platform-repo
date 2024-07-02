import { Component, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { DataService } from './service/service';
import { neoMarker } from './interface/interface';
import { icon, latLng, marker, Marker, tileLayer, Map, Icon, LeafletMouseEvent } from 'leaflet';
import * as LMarkerCluster from 'leaflet.markercluster';
import { Subject } from 'rxjs';
import 'leaflet.markercluster';

@Component({
	selector: 'sembcorp',
	templateUrl: './sembcorp.component.html'
})
export class SembcorpComponent {
	@ViewChild('dialog') dialog: ElementRef;

	constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}
	
	map: Map;
	markList: neoMarker[] = [];
	public activeMarker: Marker | null = null;
	markerClusterGroup: any;
	markers: Marker[] = [];
	titles: string[] = []
	showDemo: boolean = false;
	searchTerm: string = '';
	searchResults: string[] = [];
	searchSubject = new Subject<string>();
	currentLocation: any = {
		title: '' as string,
		latLng: {
			lat: 0,
			lng: 0
		}
	}
	dashList: string[] = [
		'Inverter Efficiency',
		'String Performance',
		'Power Curve',
		'Soiling Loss',
		'Clipping Loss'
	  ];
	  windowWidth: number;
	  windowHeight: number;
	  isMobile: boolean = false;
	  showDaily: boolean = false;

	// Open Street Map definitions
	LAYER_OSM = tileLayer('https://maps3.shipdt.com/vt?lyrs=y&h1=zh-CN&gl=CN&x={x}&y={y}&z={z}', { maxZoom: 28, attribution: 'Open Street Map' });

	// Values to bind to Leaflet Directive
	options = {
		layers: [ this.LAYER_OSM ],
		zoom: 13,
		center: latLng(1.327,  103.826)
	};


	handleResultClick(event: any) { // function to handle autocomplete search result list item clicked
		const marker = this.markers.filter(item => {
			return item.options.title === event.title;
		})
		this.onMarkerClick(marker[0], false);
	}

	openDialog() { // open details 
		this.dialog.nativeElement.showModal();
		window.dispatchEvent(new Event('resize'));
	  }
	

	onMapReady(map: Map) { // generate the map
		this.map = map;
		// add marker cluster
		this.markerClusterGroup = new LMarkerCluster.MarkerClusterGroup({
			spiderfyOnMaxZoom: true,
			showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
		});
		this.markers.forEach(marker => this.markerClusterGroup.addLayer(marker));
		this.map.addLayer(this.markerClusterGroup);
	}
	

	addListeners() {
		this.map.on('click', this.onMapClick.bind(this));
	}
	
	onMapClick(event: LeafletMouseEvent) {
		this.resetActiveMarker();
	}
	
	onMarkerClick(marker: Marker, isOpenModal: boolean) { // handle marker click to panning & open details
		this.searchTerm = marker.options.title;
		this.resetActiveMarker();
	
		this.activeMarker = marker;
	
		this.updateMarkerStyle(marker);
		const latLng = marker.getLatLng();
		console.log(latLng)
		this.currentLocation = {
			title: this.searchTerm,
			latLng: latLng
		}
		this.map.setView(latLng, this.map.getZoom());
		this.cdr.detectChanges()
		if (isOpenModal) {
			this.openDialog()
		}
	}
	
	resetActiveMarker() { // clear previous marker's position
		if (this.activeMarker) {
		  this.updateMarkerStyle(this.activeMarker, false);
		  this.activeMarker = null;
		}
	}
	
	updateMarkerStyle(marker: Marker, isActive = true) { // make marker bigger when selected
		marker.setIcon(
		  new Icon({
			iconSize: isActive ? [32.5, 53.3] : [ 25, 41 ],
			iconAnchor: [ 13, 41 ],
			iconUrl: 'assets/leaflet/marker-icon.png',
			iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
			shadowUrl: 'assets/leaflet/marker-shadow.png'
		  })
		);
	}

	openDailySection() {
		this.showDaily = false
	}

	closeModal() {
		this.dialog.nativeElement.close();
	}

	handleDailyColse(event: any) {
		if(event.msg === 'close') {
			this.showDaily= true
		}
	}

	getMarkersData() { // get marker's information from api
		this.dataService.getMarksData().subscribe(
			(response) => {
			  this.markList = response.area_metadata
			  this.markList.forEach(item => {
				const markerEle = marker(
					[item.label_location.latitude, item.label_location.longitude],
					{
						icon: icon({
							iconSize: [ 25, 41 ],
							iconAnchor: [ 13, 41 ],
							iconUrl: 'assets/leaflet/marker-icon.png',
							iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
							shadowUrl: 'assets/leaflet/marker-shadow.png'
						}),
						title: item.name
					}
				)
				this.markers.push(markerEle)
				this.titles.push(item.name)
			  })
			  this.markers.forEach(marker => {
				marker.on('click', () => {
					this.onMarkerClick(marker, true)
				});
			  });
			},
			(error) => {
			  console.error(error);
			}
		  );
	}

	ngOnInit() {
		// get markers data
		this.getMarkersData();
		var os = function (){ // detect user's device(mobile or desktop)
			var ua = navigator.userAgent,
			isWindowsPhone = /(?:Windows Phone)/.test(ua),
			isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			isAndroid = /(?:Android)/.test(ua),
			isTablet = false,
			isPhone = /(?:iPhone)/.test(ua) && !isTablet,
			isPc = !isPhone && !isAndroid && !isSymbian;
			return {
				isTablet: isTablet,
				isPhone: isPhone,
				isAndroid: isAndroid,
				isPc: isPc
			};	
		}();
		if (os.isPhone) {
			this.isMobile = true
			this.showDaily = this.isMobile
		}
		// Primarily for debugging
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);

	}
}
