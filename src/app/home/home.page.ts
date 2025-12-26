import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
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
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { addIcons } from 'ionicons';
import {
  cafeOutline,
  medkitOutline,
  medicalOutline,
  cardOutline,
  cameraOutline,
  callOutline
} from 'ionicons/icons';


@Component({
  selector: 'app-home',
  standalone: true,
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
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo: string | null = null;

  constructor(private alertController: AlertController) {
    addIcons({
      cafeOutline,
      medkitOutline,
      medicalOutline,
      cardOutline,
      cameraOutline,
      callOutline
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async findNearbyService(service: string) {
    try {
      console.log('🔍 Starting location request...');

      // Check permissions
      let permissions = await Geolocation.checkPermissions();
      console.log('📋 Current permissions:', permissions);

      if (permissions.location !== 'granted') {
        console.log('❌ Permission not granted, requesting...');
        
        const request = await Geolocation.requestPermissions();
        console.log('📋 Permission request result:', request);
        
        if (request.location !== 'granted') {
          await this.showAlert(
            'Permission Required',
            'Location permission is needed to find nearby services. Please enable it in your device settings.'
          );
          return;
        }
      }

      console.log('✅ Permission granted, getting location...');

      // Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log(`📍 Location obtained: ${lat}, ${lng}`);

      // Open Google Maps
      const url = `https://www.google.com/maps/search/${service}/@${lat},${lng},15z`;
      console.log('🗺️ Opening URL:', url);
      
      window.open(url, '_system');

      await this.showAlert('Success', `Location found: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);

    } catch (error: any) {
      console.error('❌ Location error:', error);
      
      let errorMsg = 'Unknown error occurred';
      
      if (error.message) {
        errorMsg = error.message;
      }
      
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

  async takePhoto() {
    try {
      console.log('📸 Starting camera...');
      
      const permissions = await Camera.checkPermissions();
      console.log('📋 Camera permissions:', permissions);
      
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

      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.photo = image.dataUrl ?? null;
      console.log('✅ Photo captured successfully');

    } catch (error: any) {
      console.error('❌ Camera error:', error);
      if (!error.message?.includes('cancel')) {
        await this.showAlert('Camera Error', error.message || 'Failed to capture photo');
      }
    }
  }

  async triggerEmergency() {
    console.log('🚨 Emergency button clicked!');
    
    try {
      console.log('Attempting haptics...');
      await Haptics.impact({ style: ImpactStyle.Heavy });
      console.log('Haptics done');
    } catch (e) {
      console.log('Haptics not available:', e);
    }

    console.log('Creating alert...');
    
    try {
      const emergencyAlert = await this.alertController.create({
        header: 'Need Help?',
        message: 'Choose an option:',
        buttons: [
          {
            text: 'Contact Hotel',
            handler: () => {
              console.log('Contact Hotel clicked');
              this.contactHotel();
            }
          },
          {
            text: 'Find Hospital',
            handler: () => {
              console.log('Find Hospital clicked');
              this.findNearbyService('hospitals');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancelled');
            }
          }
        ]
      });
      
      console.log('Alert created, presenting...');
      await emergencyAlert.present();
      console.log('Alert presented');
      
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  }

  async contactHotel() {
    const alert = await this.alertController.create({
      header: 'Need Help?',
      message: 'Would you like to call the hotel?\n\nPhone: +353-1-555-0100\n',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Call',
          handler: () => {
            window.location.href = 'tel:+35312345678';
          }
        }
      ]
    });

    await alert.present();
  }

}
