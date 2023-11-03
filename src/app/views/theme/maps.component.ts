import { AfterViewInit, Component, ViewChild, HostBinding, Inject, Input, OnInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { RequestListInterface } from '../../interfaces/RequestListInterface';
import { ResponseCliente } from '../../interfaces/ResponseCliente';
import { PagSelRows } from '../../interfaces/PagSelRows'
import { MapLoaderService } from 'src/app/services/maps.service';
import { AgmMap, AgmPolygon, ControlPosition, LatLng, LatLngLiteral } from '@agm/core';
import { DrawingControlOptions, OverlayType } from '@agm/drawing';

declare const google: any;
@Component({
  templateUrl: 'maps.component.html',
  styleUrls: ['maps.component.css']
})
export class MapsComponent implements OnInit {

  mapRef!: AgmMap;
  zoom: number = 15;
  lat: number = -23.626137;
  lng: number = -46.821603;

  activePolygonIndex!: number;
  drawingMode: any = null;  
  
  polygons: LatLngLiteral[][] = []
  @ViewChildren(AgmPolygon) public polygonRefs!: QueryList<AgmPolygon>;
  
  drawingControlOptions: DrawingControlOptions = {
    position: ControlPosition.TOP_CENTER,
    drawingModes: [
      OverlayType.POLYGONE
    ]
  }

  polygonOptions = {
    fillOpacity: 0.3,
    fillColor: '#ff0000',
    strokeColor: '#ff0000',
    strokeWeight: 2,
    draggable: true,
    editable: true
  }

  onLoadMap($event: AgmMap) {
    this.mapRef = $event;
  }
  onOverlayComplete($overlayEvent: any) {
    this.drawingMode = this.drawingMode === null ? '' : null;
    if ($overlayEvent.type === OverlayType.POLYGONE) {
      const newPolygon = $overlayEvent.overlay.getPath()
        .getArray()
        .map((latLng: LatLng) => ({ lat: latLng.lat(), lng: latLng.lng() }))

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay.setMap(null);
      this.polygons = [...this.polygons, newPolygon];
    }
  }

  onClickPolygon(index: number) {
    this.activePolygonIndex = index;
  }

  onEditPolygon(index: number) {
    const allPolygons = this.polygonRefs.toArray();
    allPolygons[index].getPath()
      .then((path: Array<LatLng>) => {
        this.polygons[index] = path.map((latLng: LatLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng()
        }))
      })
  }

  onDeleteDrawing() {
    this.polygons = this.polygons.filter((polygon, index) => index !== this.activePolygonIndex)
  }
  
  deleteIconStyle = {
    cursor: 'pointer',
    backgroundImage: 'url(../assets/images/remove.png)',
    height: '24px',
    width: '24px',
    marginTop: '5px',
    backgroundColor: '#fff',
    position: 'absolute',
    top: "2px",
    left: "52%",
    zIndex: 99999
  }




  ngOnInit(): void {
    
  }

}