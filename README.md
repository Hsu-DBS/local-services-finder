# Smart Local Services Finder

## Web and Mobile Technologies (B9IS126)

Smart Local Services Finder is a **hybrid mobile application** developed as part of the **Web and Mobile Technologies (B9IS126)** module.  
The application is designed for a **local services discovery and community support business**, allowing users to find nearby essential services and access emergency assistance using native mobile device capabilities.

---

## Aim of the Project

The aim of this project is to design and develop a **hybrid mobile application** using modern web technologies that can be deployed on mobile platforms.  
The project demonstrates how a **single codebase** can deliver real mobile functionality by integrating **native device features** through the Ionic and Capacitor framework.

---

## Business Context

The application is developed for a **Local Services Discovery and Community Support business**.  
It supports residents, students, and visitors by helping them quickly locate essential services and request assistance in urgent situations.

Business objectives include:
- Improving accessibility to essential local services
- Enhancing user safety through emergency support features
- Providing a simple, reliable, and mobile-friendly experience

---

## Technologies Used

The application was developed using the following technologies:

- **Ionic Framework** – Mobile UI components and responsive layout
- **Angular (Standalone Components)** – Application structure and logic
- **Capacitor** – Native runtime and device integration
- **HTML5** – Page structure
- **SCSS/CSS** – Styling and layout
- **TypeScript** – Application logic
- **Android Emulator** – Testing and deployment

This technology stack enables the application to function as a **hybrid mobile application**, combining web technologies with native mobile functionality.

---

## Capacitor Plugins Used

The following Capacitor plugins were integrated to access native device features:

- **Geolocation** – Retrieve the user’s current location
- **Camera** – Capture photos using the device camera
- **Haptics** – Provide vibration feedback for emergency actions
- **Network** – Detect internet connectivity status
- **Toast** – Display lightweight, non-intrusive user notifications

---

## Application Features

### 1️⃣ Nearby Services Finder (Geolocation + Network)

Users can locate nearby essential services including:
- Cafés
- Pharmacies
- Hospitals
- ATMs

The application retrieves the user’s current location and opens **Google Maps** to display nearby services based on the selected category.  
When running on the **Android Emulator**, Google Maps may take approximately **5 seconds to load**, which is a known emulator performance limitation.  
A network connectivity check is performed before opening Google Maps to improve reliability.

**Plugins used:**  
- Capacitor Geolocation  
- Capacitor Network  

**Business purpose:**
- Saves time when searching for services
- Helps users in unfamiliar locations
- Improves accessibility and convenience

---

### 2️⃣ Camera Feature (Camera + Toast)

The application includes a camera feature that allows users to capture photos directly from their device.  
This feature can be used to document service locations or safety-related situations.  
When a photo is successfully captured, a **toast notification** is displayed to provide immediate, non-intrusive feedback confirming the action.

**Plugins used:**  
- Capacitor Camera  
- Capacitor Toast  

**Business purpose:**
- Enables visual documentation
- Enhances user interaction with native device hardware
- Improves user experience through instant confirmation feedback

---

### 3️⃣ Need Help Feature (Haptics + Toast + Native Call)

The application includes a **Need Help** feature designed to support users in urgent situations.  
When activated, the device provides immediate **haptic feedback** using the Capacitor Haptics plugin.  
A **toast notification** is displayed to inform the user that emergency support is being contacted, and the **native phone dialer** is opened to call a predefined support number.

**Plugins used:**  
- Capacitor Haptics  
- Capacitor Toast  

**Native functionality:**  
- Android phone dialer  

**Business purpose:**
- Provides immediate tactile and visual feedback
- Enables quick and reliable emergency communication
- Enhances user safety and accessibility in urgent scenarios

---

## User Interface Design

The user interface was built using Ionic UI components such as:
- Cards
- Buttons
- Grids
- Icons

Design principles applied:
- Touch-friendly layout for mobile devices
- Clear visual hierarchy
- Consistent colours and spacing
- Responsive design for different screen sizes

The interface is clean, intuitive, and optimised for mobile use.

---

## Splash Screen and App Icons

A custom **splash screen** and **application icons** were generated using Capacitor asset tools.

- Splash screen is displayed during application startup
- Platform-specific icons are generated for Android

These features provide a professional and platform-appropriate appearance.

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

## How to Install and Run the Project

### Prerequisites
- Node.js
- Ionic CLI
- Android Studio
- Android Emulator

---

### Install Ionic CLI (if not installed)
```bash
npm install -g @ionic/cli
```

---

### Install Project Dependencies
```bash
npm install
```

---

### Install Capacitor Plugins
```bash
npm install @capacitor/geolocation
npm install @capacitor/camera
npm install @capacitor/haptics
npm install @capacitor/network
npm install @capacitor/toast
```

---

### Sync Capacitor Plugins
```bash
npx cap sync
```

---

### Add Android Platform (First Time Only)
```bash
ionic capacitor add android
```

---

### Run in Browser (Development)
```bash
ionic serve
```

---

### Build and Run on Android Emulator
```bash
ionic build
npx cap sync android
ionic capacitor run android
```

---

### Generate App Icons and Splash Screen
```bash
npx cap assets generate
npx cap sync
```

---

## Testing and Deployment

The application was tested using:
- Web browser (development)
- Android Emulator (Pixel device)

Verified functionality includes:
- Application launch and splash screen
- Location-based service search
- Camera functionality with toast feedback
- Emergency call feature with haptics and toast
- Responsive user interface

Minor limitations related to GPS and network simulation in the Android emulator were observed.  
These are known emulator constraints and do not affect real devices.

---

## Conclusion

The Smart Local Services Finder application successfully demonstrates the development of a **hybrid mobile application** for a real-world business scenario.  
By integrating web technologies with native mobile features such as geolocation, camera access, haptic feedback, network detection, and toast notifications, the project highlights the effectiveness of hybrid mobile development using Ionic and Capacitor.

---

## Developer

**Hsu Myint Myat Kyaw**  
Web and Mobile Technologies (B9IS126)  
Platform: Android
