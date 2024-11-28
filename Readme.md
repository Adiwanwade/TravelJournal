# Travel Journal App 🚀

An elegant **React Native Travel Journal App** designed with a sleek purple, violet, and black theme. This app empowers users to update their Travel Stories, change profile pictures, and manage their account with ease.

## 🌟 Features

* 🎨 **Modern UI Design**
  - Captivating purple, violet, and black color palette
  - Consistent and intuitive user interface across screens

* 📸 **Profile Picture Management**
  - Seamless image selection from device gallery
  - Easy profile picture update functionality
  - Support for multiple image formats

* 📝 **Comprehensive Profile Editing**
  - Update Travel stories effortlessly
  - Edit fields including:
    - Full Name
    - Email Address
    - Personal Bio
  - Real-time validation and error handling

* 💾 **Robust Data Persistence**
  - Secure local storage using `AsyncStorage`
  - Automatic saving of user preferences
  - Seamless data retrieval across app sessions

* 🚪 **Secure Logout**
  - One-tap logout functionality
  - Clear session management
  - Smooth navigation back to login screen

* 📱 **Adaptive Responsiveness**
  - Fully responsive design
  - Optimal display on various device screen sizes
  - Supports both Android and iOS platforms

## 📽️ Demo Video

![🎥 Watch App Walkthrough](./screenshots%20and%20videos/Android%20Emulator%20-%20Pixel_3a_API_34_extension_level_7_x86_64_5554%202024-11-28%2018-05-47%20(2).gif)

## 🖼️ Screenshots

| Register Screen |Login Screen | Journal Screen Picture |
|---------------|---------------------|------------------------|
| ![Register Screen](./screenshots%20and%20videos/Screenshot%202024-11-28%20181516.png) | ![Login Screen ](./screenshots%20and%20videos/image.png) | ![Journal Screen Picture](./screenshots%20and%20videos/Screenshot%202024-11-28%20181651.png) |

## 🔧 Technologies & Libraries

### Core Technologies
* **React Native** - Cross-platform mobile development framework
* **React Hooks** - Modern state management and component logic
* **TypeScript** - Enhanced type safety and developer experience

### Navigation
* **React Navigation** - Intuitive screen transitions and routing

### Storage
* **AsyncStorage** - Persistent local data storage


### Media Handling
* **react-native-image-picker** - Advanced media selection
* **react-native-fast-image** - Optimized image loading

### UI Components
* **react-native-vector-icons** - High-quality, customizable icons
* **Styled Components** - Modular and dynamic styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Adiwanwade/TravelJournalApp.git
   cd TravelJournalApp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**

   For Android:
   ```bash
   npx react-native run-android
   ```

   For iOS:
   ```bash
   npx react-native run-ios
   ```

## 🌈 Project Structure

```
profile-manager-app/
├── src/
│   ├── components/
│   │   ├── ProfileScreen.tsx
│   │   ├── EditProfileForm.tsx
│   │   └── ProfilePictureSelector.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── ProfileScreen.tsx
│   │   └── EditProfileScreen.tsx
│   ├── utils/
│   │   ├── storage.ts
│   │   └── validation.ts
│   └── types/
│       └── user.ts
├── assets/
│   ├── icons/
│   └── images/
├── screenshots/
├── App.tsx
└── package.json
```

## 🌟 Future Roadmap

- [ ] 🌐 Internationalization (i18n) support
- [ ] 🔒 OAuth/Social Login integration
- [ ] 🌈 Customizable app themes
- [ ] 📊 User engagement analytics
- [ ] 🌙 Dark mode implementation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Aditya Wanwade - [Adiwanwade@gmail.com](mailto:your.email@example.com)

Project Link: [https://github.com/Adiwanwade/TravelJournal](https://github.com/Adiwanwade/TravelJournal)

---

**Made with ❤️ by Aditya Wanwade**