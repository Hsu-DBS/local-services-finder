import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo: string | null = null;

  constructor() {}

  async findNearbyService(service: string) {
    try {
      // 1. Request permission explicitly
      const permission = await Geolocation.requestPermissions();

      if (permission.location !== 'granted') {
        alert('Location permission is required to find nearby services.');
        return;
      }

      // 2. Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // 3. Open Google Maps
      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      window.open(url, '_blank');

    } catch (error) {
      console.error(error);
      alert('Unable to get location. Please check GPS settings.');
    }
  }


  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.photo = image.dataUrl ?? null;

    } catch (error) {
      console.error('Camera error', error);
    }
  }
}
