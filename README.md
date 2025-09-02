# UncoveredJobsApp

A React Native application built with TypeScript and modern development practices.

## 🚀 Features

- **React Native 0.81.1** - Latest stable version
- **TypeScript Support** - Type-safe development
- **Yarn Package Manager** - Fast and reliable dependency management
- **Dark/Light Mode Support** - Automatic theme switching
- **Safe Area Context** - Proper handling of device safe areas
- **Modern UI Components** - Clean and responsive design

## 📱 Getting Started

### Prerequisites

- Node.js (>= 20)
- Yarn package manager
- React Native development environment
- For iOS: Xcode (>= 16.1 recommended)
- For Android: Android Studio and Android SDK

### Installation

1. Navigate to the project directory:
   ```bash
   cd uncovered-jobs-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. For iOS, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

1. Start the Metro bundler:
   ```bash
   yarn start
   ```

2. Run on iOS:
   ```bash
   yarn ios
   ```

3. Run on Android:
   ```bash
   yarn android
   ```

## 🛠 Development

### Available Scripts

- `yarn start` - Start the Metro bundler
- `yarn ios` - Run the app on iOS simulator
- `yarn android` - Run the app on Android emulator
- `yarn test` - Run tests
- `yarn lint` - Run ESLint

### Project Structure

```
uncovered-jobs-app/
├── App.tsx              # Main app component
├── index.js             # App entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler configuration
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
└── __tests__/           # Test files
```

## 🎨 Customization

The app includes a custom interface with:
- Welcome screen with app features
- Interactive button with alert functionality
- Dark/light mode support
- Responsive design with proper spacing
- Modern card-based layout

## 📝 Notes

- Metro bundler runs on port 8082 (configurable)
- The app supports both iOS and Android platforms
- TypeScript provides type safety and better development experience
- ESLint and Prettier are configured for code quality

## 🔧 Troubleshooting

If you encounter issues:

1. **Metro bundler port conflict**: Use `yarn start --port <PORT_NUMBER>`
2. **iOS build issues**: Ensure Xcode version >= 16.1
3. **Android build issues**: Check Android SDK and emulator setup
4. **Dependencies issues**: Try `yarn install --force` or delete `node_modules` and reinstall

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Native CLI](https://github.com/react-native-community/cli)

---

Built with ❤️ using React Native
