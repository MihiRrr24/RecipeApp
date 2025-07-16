# 🚀 Recipe Organizer App

*A modern mobile app to manage your cooking recipes with images, categories, and local storage — with dark mode and search built-in!*

---

## 📸 Screenshots

| Home Page | Add Recipe | Dark Mode |
|----------|------------|-----------|
| ![Home](![Screenshot_2025-07-16-10-06-06-19_f73b71075b1de7323614b647fe394240](https://github.com/user-attachments/assets/df2d38e3-4b93-425a-a8f7-cdcb4fe54197)
) | ![Add]![Screenshot_2025-07-16-10-06-10-61_f73b71075b1de7323614b647fe394240](https://github.com/user-attachments/assets/22791617-fac8-415f-af16-234a39939f42)
 | ![Dark](![Screenshot_2025-07-16-10-06-02-18_f73b71075b1de7323614b647fe394240](https://github.com/user-attachments/assets/96d2a334-bd50-49eb-8040-b9d985255f37)
) |


---

## ✨ Purpose of the App

> This app is designed for food lovers and cooking enthusiasts to store, manage, and organize their favorite recipes. It allows users to add/edit/delete recipes with images, search them by ingredients, and categorize them as Veg, Dessert, or Non-Veg. The app is built for offline use and supports both light and dark themes.

---

## 🛠 Tech Stack

- 📱 **Frontend**: React Native (with Expo)
- 💾 **Local Storage**: AsyncStorage
- 🧭 **Navigation**: React Navigation (Native Stack)
- 📷 **Media Access**: Expo Image Picker
- 🌙 **Dark Mode**: `useColorScheme` + UI toggling
- 🎨 **Custom Components**: RecipeCard, RecipeForm

---

## 🧩 Key Features

- 📷 Pick image from gallery for each recipe
- 🗂️ Category selection (Veg, Dessert, Non-Veg)
- 🔍 Search by ingredients (real-time filtering)
- 🌗 Dark mode support
- 💾 Data persistence using AsyncStorage
- 🧱 Modular and component-based UI
- 🖼 Background image support on screens
- 🧭 Splash screen & custom app icon

---

## 👨‍💻 Author

| Name          | GitHub                            | Email                |
|---------------|-----------------------------------|----------------------|
| Mihir Shrestha | [@MihiRrr24](https://github.com/MihiRrr24) | mihirshrestha4@gmail.com |

---

## 📚 What I Learned

- Building real-world mobile apps with React Native and Expo
- Managing data locally using AsyncStorage
- Handling image permissions & file URIs in Android
- Implementing responsive and clean UI with dark/light themes
- Managing navigation flow and state between screens
- Generating APKs using EAS Build and sharing them via Drive

---

## 🚧 Installation & Running Locally

```bash
git clone https://github.com/MihiRrr24/RecipeApp.git
cd recipe-organizer
npm install
npx expo start
```

> Open the Expo Go app on your Android device and scan the QR code to preview.

---

## 📦 Build APK for Android

If you're using Expo with EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

After build completion, upload the `.apk` to Google Drive and share the link.
