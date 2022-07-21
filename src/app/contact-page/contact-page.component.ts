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
  address = "Kremenchuk, 39600, Poltavska"


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
  const myLatLng = { lat: 49.06297, lng: 33.39978 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 16,
      center: myLatLng,
    });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Prydniprovskii Park",
  });
}
