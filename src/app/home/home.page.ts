import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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

  // GEOLOCATION
  async findNearbyService(service: string) {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 15000,
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      window.open(url, '_blank');

    } catch (error) {
      alert('Unable to get location. Please enable GPS.');
      console.error(error);
    }
  }

  // CAMERA
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

  // EMERGENCY ALERT (HAPTICS)
  async triggerEmergency() {
    try {
      await Haptics.impact({
        style: ImpactStyle.Heavy,
      });

      // Visual confirmation (VERY IMPORTANT for emulator)
      alert('🚨 Emergency alert activated!');

    } catch (error) {
      console.error('Haptics error', error);
    }
  }
}
