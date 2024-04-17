# My React Native Bare Application

Welcome to my React Native bare application! This project serves as a starting point for your mobile app development. Below are the instructions to set up and run the application on Android and iOS.

## Getting Started

**Clone the Repository:**
   git clone https://github.com/tahazalzali/Gnews
   cd gnews

**Install Project Dependencies:**
Navigate to your project directory and run the following command to install the project dependencies:

npm install


## Running the Application

**For Android:**
Make sure you have an Android emulator installed and running, or a device connected via USB with USB Debugging enabled. Then, run the following command:

npx react-native run-android

**For iOS:**
Navigate to the iOS directory (`cd ios`) and install the CocoaPods dependencies with `pod install`. Then, return to the root directory (`cd ..`) and run the following command:

npx react-native run-ios

## Setting Up GNews API Key

The application uses the GNews API to fetch news data. You need to replace the placeholder API key with your actual GNews API key.

1. Navigate to the `util` directory and open the `ApiKey.ts` file.

2. Replace `YOUR_GNEWS_API_KEY_HERE` with your actual GNews API key in the following line:

   export const news = "YOUR_GNEWS_API_KEY_HERE";


## Enjoy the Application

You have now successfully set up and configured your React Native application. Enjoy exploring and using the application. If you have any questions or encounter any issues, feel free to open an issue in the repository. Happy coding!


https://github.com/tahazalzali/Gnews/assets/76237241/d5e1bf63-22b5-41ee-9172-c7d2187d8541



