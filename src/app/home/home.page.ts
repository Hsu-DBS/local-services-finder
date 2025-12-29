/*
REFERENCES:
Angular Components: https://angular.io/guide/component-overview
Ionic Standalone Components: https://ionicframework.com/docs/angular/build-options
Ionic Alerts: https://ionicframework.com/docs/api/alert
Capacitor Geolocation: https://capacitorjs.com/docs/apis/geolocation
Capacitor Camera: https://capacitorjs.com/docs/apis/camera
Capacitor Haptics: https://capacitorjs.com/docs/apis/haptics
Ionicons Usage: https://ionic.io/ionicons
*/

// Import Angular core decorator
import { Component } from '@angular/core';

// Import common Angular module
import { CommonModule } from '@angular/common';

// Import Ionic Alert Controller for pop-up alerts
import { AlertController } from '@ionic/angular';

// Import Ionic standalone UI components
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/angular/standalone';

// Import Capacitor plugins
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

// Import Ionicons utilities
import { addIcons } from 'ionicons';

// Import required icons
import {
  cafeOutline,
  medkitOutline,
  medicalOutline,
  cardOutline,
  cameraOutline,
  callOutline
} from 'ionicons/icons';

// Component decorator defines metadata for HomePage
@Component({
  selector: 'app-home',
  standalone: true,

  // Standalone components must explicitly import used modules
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
  ],

  // HTML and SCSS files linked to this component
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Stores the captured photo
  photo: string | null = null;

  // Constructor injects AlertController dependency
  constructor(private alertController: AlertController) {

    // Register icons for use in the template
    addIcons({
      cafeOutline,
      medkitOutline,
      medicalOutline,
      cardOutline,
      cameraOutline,
      callOutline
    });
  }

  // Reusable alert method
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Find nearby services using device location
  async findNearbyService(service: string) {
    try {
      const status = await Network.getStatus();

      if (!status.connected) {
        await this.showAlert(
          'No Internet Connection',
          'Please connect to the internet to search nearby services.'
        );
        return;
      }

      console.log('Starting location request...');

      // Check location permission status
      let permissions = await Geolocation.checkPermissions();
      console.log('Current permissions:', permissions);

      // Request permission if not granted
      if (permissions.location !== 'granted') {
        console.log('Permission not granted, requesting...');
        
        const request = await Geolocation.requestPermissions();
        console.log('Permission request result:', request);
        
        if (request.location !== 'granted') {
          await this.showAlert(
            'Permission Required',
            'Location permission is needed to find nearby services. Please enable it in your device settings.'
          );
          return;
        }
      }

      console.log('Permission granted, getting location...');

      // Get current GPS coordinates
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log(`Location obtained: ${lat}, ${lng}`);

      // Construct Google Maps search URL
      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      console.log('Opening URL:', url);

      // Open Google Maps in external browser
      window.open(url, '_system');

      // Notify user of success
      await this.showAlert(
        'Success',
        `Location found: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      );

      await Toast.show({
        text: 'Location detected successfully',
        duration: 'short',
        position: 'bottom'
      });

    } catch (error: any) {
      console.error('Location error:', error);

      // Default error message
      let errorMsg = 'Unknown error occurred';

      if (error.message) {
        errorMsg = error.message;
      }

      // Handle common location errors
      if (error.message?.includes('location disabled')) {
        errorMsg = 'Please enable location services:\n\nSettings → Location → Turn ON';
      } else if (error.message?.includes('timeout')) {
        errorMsg = 'Location request timed out. Make sure location is enabled and GPS has signal.';
      } else if (error.message?.includes('denied')) {
        errorMsg = 'Location permission denied. Enable it in:\n\nSettings → Apps → Smart Local Services → Permissions → Location';
      }

      await this.showAlert('Location Error', errorMsg);
    }
  }

  // Take a photo using the device camera
  async takePhoto() {
    try {
      console.log('📸 Starting camera...');

      // Check camera permission
      const permissions = await Camera.checkPermissions();
      console.log('Camera permissions:', permissions);

      // Request permission if not granted
      if (permissions.camera !== 'granted') {
        const request = await Camera.requestPermissions();

        if (request.camera !== 'granted') {
          await this.showAlert(
            'Permission Required',
            'Camera permission is needed to take photos.'
          );
          return;
        }
      }

      // Capture photo
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      // Store captured image
      this.photo = image.dataUrl ?? null;
      console.log('Photo captured successfully');

      //success feedback
      await Toast.show({
        text: 'Photo captured successfully',
        duration: 'short',
        position: 'bottom'
      });

    } catch (error: any) {
      console.error('Camera error:', error);

      // Ignore cancel action
      if (!error.message?.includes('cancel')) {
        await this.showAlert(
          'Camera Error',
          error.message || 'Failed to capture photo'
        );
      }
    }
  }

  // Emergency call with haptic feedback
  async callHelp() {
    // Trigger vibration feedback
    await Haptics.impact({ style: ImpactStyle.Heavy });

    // Show toast feedback
    await Toast.show({
      text: 'Calling emergency support...',
      duration: 'short',
      position: 'center'
    });

    // Open phone dialer
    window.location.href = 'tel:+353800000000';
  }

}
