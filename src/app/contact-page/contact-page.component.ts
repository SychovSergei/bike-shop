import { Component, OnInit } from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  title="Contacts"
  address = "Kharkiv, Kharkivs'ka oblast, 61000, Biblyka St, 48"


  constructor(private titleService: Title) {
    this.titleService.setTitle("Bike Shop Contact");
  }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyD2fC1as80FnG81E5O8RvVAaQSja-ISaWU',
    })
    loader.load().then(() => {
      initMap()
    })
  }

}

function initMap() {
  const myLatLng = { lat: 49.94047, lng: 36.39337 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 12,
      center: myLatLng,
    });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Zelenyy Hay Park",
  });
}
