# Smart Local Services Finder

## Web and Mobile Technologies (B9IS126)

Smart Local Services Finder is a **hybrid mobile application** developed as part of the **Web and Mobile Technologies (B9IS126)** module.  
The application is built for a **local services and community support business**, enabling users to quickly find essential nearby services and access emergency support using native mobile device features.

---

## Aim of the Project

The aim of this project is to design and develop a **hybrid mobile application** using web technologies that can be deployed on a mobile platform.  
The project demonstrates how a **single codebase** can be used to deliver real mobile functionality by integrating **native device capabilities** through a hybrid development approach.

---

## Business Context

The application is developed for a **Local Services Discovery and Community Support business**.  
This business focuses on helping users such as residents, students, and visitors quickly locate essential services and receive assistance in urgent situations.

Business objectives include:
- Improving accessibility to essential local services
- Enhancing user safety through emergency support features
- Providing a simple, reliable, and mobile-friendly experience

---

## Technologies Used

The application was developed using technologies discussed in the module:

- **Ionic Framework** – Mobile UI components and layout
- **Angular (Standalone Components)** – Application structure and logic
- **Capacitor** – Native runtime and device integration
- **HTML5** – Page structure
- **CSS** – Styling and layout
- **TypeScript** – Application logic
- **Android Emulator** – Deployment and testing

This technology stack enables the application to function as a **hybrid mobile application**, combining web technologies with native mobile capabilities.

---

## Application Features

### 1️⃣ Nearby Services Finder (Geolocation)

Users can locate nearby essential services including:
- Cafés
- Pharmacies
- Hospitals
- ATMs

The application retrieves the user’s current location and opens Google Maps to display nearby services based on the selected category. Depending on network connectivity and device performance, there may be a short delay while Google Maps loads.

**Plugin used:** Capacitor Geolocation  

**Business purpose:**
- Saves time when searching for services
- Helps users in unfamiliar locations
- Improves accessibility and convenience

---

### 2️⃣ Camera Feature

The application allows users to take photos directly using the device camera.  
Captured images are displayed within the application interface.

**Plugin used:** Capacitor Camera  

**Business purpose:**
- Enables visual documentation of locations or situations
- Demonstrates access to native hardware
- Enhances user interaction

---

### 3️⃣ Need Help Feature (Vibration + Call)

The **Need Help** feature is designed for urgent situations.  
When the user activates this feature:

1. The device provides immediate **haptic feedback** using vibration  
2. The **native phone dialer** opens to contact a predefined support number  

**Plugin used:** Capacitor Haptics  
**Native functionality:** Android phone dialer  

**Business purpose:**
- Provides instant tactile confirmation
- Enables reliable emergency communication
- Enhances user safety and confidence

---

## User Interface Design

The user interface was designed using Ionic UI components such as:
- Cards
- Buttons
- Grids
- Icons

Design principles applied:
- Touch-friendly layout suitable for mobile devices
- Clear visual hierarchy
- Consistent colours and spacing
- Responsive design for different screen sizes

The interface is clean, user-friendly, and optimised for mobile use.

---

## Splash Screen and App Icons

A custom **splash screen** and **application icons** were added using Capacitor’s asset generation tools.

- The splash screen is displayed during application startup
- Platform-specific icons are generated for the Android launcher

These features ensure a professional and platform-appropriate appearance.

---

## Testing and Deployment

The application was built and deployed to the **Android platform** using Capacitor.

Testing was carried out using:
- Android Emulator (Pixel device)

Verified functionality includes:
- Application launch and splash screen display
- Navigation between service categories
- Camera functionality
- Emergency call feature
- Overall UI responsiveness

Minor limitations related to GPS simulation in the emulator were observed, which are known constraints of emulator environments.

---

## Project Structure

```
smart-local-services-finder/
├── src/
│   ├── app/
│   │   └── home/
│   │       ├── home.page.html
│   │       ├── home.page.scss
│   │       └── home.page.ts
│   ├── assets/
│   └── theme/
├── android/
├── resources/
│   ├── icon.png
│   └── splash.png
├── capacitor.config.ts
├── package.json
└── README.md
```

---

## How to Run the Project

### Prerequisites
- Node.js
- Ionic CLI
- Android Studio
- Android Emulator

### Install Dependencies
```bash
npm install
```

### Run in Browser (Development)
```bash
ionic serve
```

### Build and Run on Android
```bash
ionic build
npx cap sync android
ionic capacitor run android
```

---

## Conclusion

The Smart Local Services Finder application successfully demonstrates the development of a hybrid mobile application for a real-world business scenario.  
By integrating web technologies with native mobile features such as geolocation, camera access, and haptic feedback, the project highlights the effectiveness of hybrid mobile development.  
All assignment requirements have been met, and the application was successfully deployed and tested on the Android platform.

---

## Developer

**Hsu Myint Myat Kyaw**  
Web and Mobile Technologies (B9IS126)  
Platform: Android
