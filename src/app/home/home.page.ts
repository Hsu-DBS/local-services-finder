import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  async findNearbyService(service: string) {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      window.open(url, '_blank');

    } catch (error) {
      console.error('Error getting location', error);
      alert('Unable to get location. Please enable location services.');
    }
  }
}
