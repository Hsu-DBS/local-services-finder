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

  async findNearbyService(service: string) {
    try {

      // ✅ BROWSER MODE
      if (!('Capacitor' in window)) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
            window.open(url, '_blank');
          },
          (error) => {
            console.error(error);
            alert('Browser location access failed.');
          }
        );
        return;
      }

      // ✅ MOBILE MODE (Android / iOS)
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      window.open(url, '_blank');

    } catch (error) {
      console.error(error);
      alert('Unable to get location.');
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

  async triggerEmergency() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
    alert('Emergency alert activated!');
  }
}
